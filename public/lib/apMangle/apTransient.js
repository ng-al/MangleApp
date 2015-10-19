(function (global) {
    "use strict";

    var transientIdSeed = 0;

    angular
        .module("apTransient", [])
        .config(
        ["$injector",
            function ($injector) {
                var ngGetFn;

                ngGetFn = $injector.get;
                $injector.get = function (name, caller) {
                    var asIndex;
                    var isSingleton;
                    var isTransient;
                    var provider;
                    var providerName;
                    var transientId;

                    asIndex = name.toLowerCase().indexOf(" as ");
                    providerName = (asIndex != -1) ? name.substring(0, asIndex) + "Provider" : name;
                    isSingleton = (asIndex === -1 || name.toLowerCase().indexOf(" as singleton") !== -1);
                    isTransient = (name.toLowerCase().indexOf(" as transient") !== -1);

                    provider = ngGetFn(providerName, caller);
                    if (isSingleton)
                        return provider;

                    if (isTransient) {
                        transientId = name.match(/ as transient(\d*)/i)[1];
                        transientId = (transientId === "") ? ++transientIdSeed : transientId;
                        if (!provider.$share)
                            provider.$share = {};

                        (function (iife) {
                            var providerFn = iife.provider.$get;

                            // Patch the provider function so that we can create the transient.
                            iife.provider.$get = function () {
                                var service = providerFn();
                                var transient;

                                if (angular.isObject(service)) {
                                    transient = angular.copy(service);
                                    transient.$share = iife.provider.$share;
                                    transient.$transientId = eval(iife.transientId);
                                    return transient;
                                }

                                // If running the provider function returns a function, then the service is returning a 'type' that must be newed.
                                // Substitute the constructor with an inline function.
                                // When someone new()s the type, we will create the $share property.
                                if (angular.isFunction(service)) {
                                    return function () {
                                        var instance = new service();
                                        instance.$share = iife.provider.$share;
                                        instance.$transientId = eval(iife.transientId);
                                        return instance;
                                    }
                                }

                                throw new Error("internal error: apServiceTransient - provider.$get()");
                            };
                        })({
                            provider: provider,
                            transientId: transientId
                        });


                        return provider;
                    }

                    throw new Error("internal error: apServiceTransient.$injector.get()");
                }
            }]);


    function initialize() {
        if (!global.mangle) throw new Error("Mangle.js must be included before apTransient.js");

        var mangle = global.mangle;

        mangle.registerHook(mangle.MethodEnum.ANIMATION, function (name, animationFactory) {
            return {name: name, animationFactory: modifyInjection(animationFactory)}
        });

        mangle.registerHook(mangle.MethodEnum.CONTROLLER, function (name, constructor) {
            return {name: name, constructor: modifyInjection(constructor)}
        });

        mangle.registerHook(mangle.MethodEnum.DIRECTIVE, function (name, directiveFactory) {
            return {name: name, directiveFactory: modifyInjection(directiveFactory)}
        });

        mangle.registerHook(mangle.MethodEnum.FACTORY, function (name, providerFunction) {
            return {name: name, providerFunction: modifyInjection(providerFunction)}
        });

        mangle.registerHook(mangle.MethodEnum.FILTER, function (name, filterFactory) {
            return {name: name, filterFactory: modifyInjection(filterFactory)}
        });

        mangle.registerHook(mangle.MethodEnum.RUN_BLOCK, function (block) {
            return modifyInjection(block)
        });

        mangle.registerHook(mangle.MethodEnum.SERVICE, function (name, constructor) {
            return {name: name, constructor: modifyInjection(constructor)}
        });
    }

    // Since AngularJS caches services, we need to give each transient service a distinct name.
    // This guarantees that the injection code (above) will be called.
    function modifyInjection(injection) {
        var result = injection;

        if (angular.isArray(injection)) {
            result = [];
            angular.forEach(injection, function (item) {
                var match = angular.isString(item) ? item.match(/^(.* as transient)(\d*).*$/) : null;
                var newItem = match ? match[1] + ++transientIdSeed : item;
                result.push(newItem);
            });
        }

        return result;
    }


    initialize();

})(this);
