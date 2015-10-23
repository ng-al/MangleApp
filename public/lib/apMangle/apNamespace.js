(function(global) {
    "use strict";

    var services = {};

    angular
        .module("apNamespace", [])
        .config(
        ["$injector",
        function($injector) {
            var defaultModule;
            var index;
            var modules;
            var ngGetFn;
            var serviceName;

            ngGetFn = $injector.get;
            $injector.get = function(name, caller) {
                if (name.indexOf('.') === -1) {
                    index = name.lastIndexOf("Provider");
                    serviceName = (index !== -1) ? name.substr(0, index) : name;
                    modules = services[serviceName];

                    if (modules) {
                        defaultModule = modules[0];
                        if (modules.length > 1) {
                            console.log("$injector: " + serviceName + " defined in multiple modules: " +
                                JSON.stringify(modules) +
                                ". Using module " + defaultModule);
                        }

                        name = defaultModule + "." + name;
                    }
                }
                return ngGetFn(name, caller);
            }
        }]);

    function initialize() {
        if (!global.mangle) throw new Error("Mangle.js must be included before apNamespace.js");

        var mangle = global.mangle;

        mangle.registerHook(mangle.MethodEnum.FACTORY, function (name, providerFunction) {
            return { name: modifyName(name, "factory"), providerFunction: providerFunction }
        });

        mangle.registerHook(mangle.MethodEnum.SERVICE, function (name, constructor) {
            return { name: modifyName(name, "service"), constructor: constructor }
        });

        mangle.registerHook(mangle.MethodEnum.VALUE, function (name, object) {
            return { name: modifyName(name, "value"), object: object }
        });
    }

    function modifyName(name, recipeName) {
        var currentModule = global.mangle.currentModule;

        if (name.indexOf(currentModule.name + ".") === 0)
            return name;

        if (!services[name])
            services[name] = [];

        services[name].unshift(currentModule.name);

        if (services[name].length > 1) {
            console.log("module." + recipeName + ": " +
                name + "' defined in multiple modules: " + JSON.stringify(services[name]));
        }

        return currentModule.name + "." + name;
    }

    initialize();

})(this);

