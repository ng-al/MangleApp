(function (global) {
    "use strict";

    var hookId = 0;

    function initialize() {
        if (!global.angular) throw new Error("Mangle requires AngularJS");
        if (!global.angular.module) throw new Error("internal error:  Unable to find angular.module()");

        global.mangle = new Mangle();
    }

    function Mangle() {
        var that = this;
        that.currentModule = null;
        that.hooks = [];
        that.ngModuleFn = angular.module;

        angular.module = function (name, requires, configFn) {
            that.currentModule = new that.Module(name, that.ngModuleFn(name, requires, configFn));

            that.patchRunBlock(that.currentModule);

            that.patchAnimationRecipe(that.currentModule);
            that.patchControllerRecipe(that.currentModule);
            that.patchDecoratorRecipe(that.currentModule);
            that.patchDirectiveRecipe(that.currentModule);
            that.patchFactoryRecipe(that.currentModule);
            that.patchFilterRecipe(that.currentModule);
            that.patchServiceRecipe(that.currentModule);

            angular.forEach(that.hooks, function (hook) {
                if (hook.methodType === that.MethodEnum.MODULE)
                    hook.hookFn(that.currentModule);
            });

            return that.currentModule.module;
        }
    }

    Mangle.prototype = {

        patchAnimationRecipe: function (module) {
            var that = this;
            var ngAnimationFn = module.module.animation;

            module.module.animation = function (name, animationFactory) {
                var info = { name: name, animationFactory: animationFactory };
                angular.forEach(that.hooks, function (hook) {
                    if (hook.methodType === that.MethodEnum.ANIMATION)
                        info = hook.hookFn(info.name, info.animationFactory);
                });

                ngAnimationFn(info.name, info.animationFactory);
                return module.module;
            }
        },

        patchControllerRecipe: function (module) {
            var that = this;
            var ngControllerFn = module.module.controller;

            module.module.controller = function (name, constructor) {
                var info = { name: name, constructor: constructor };
                angular.forEach(that.hooks, function (hook) {
                    if (hook.methodType === that.MethodEnum.CONTROLLER)
                        info = hook.hookFn(info.name, info.constructor);
                });

                ngControllerFn(info.name, info.constructor);
                return module.module;
            }
        },

        patchDecoratorRecipe: function (module) {
            var that = this;
            var ngDecoratorFn = module.module.decorator;

            module.module.decorator = function (The, This) {
                var info = { The: The, This: This };
                angular.forEach(that.hooks, function (hook) {
                    if (hook.methodType === that.MethodEnum.DECORATOR)
                        info = hook.hookFn(info.The, info.This);
                });

                ngDecoratorFn(info.The, info.This);
                return module.module;
            }
        },

        patchDirectiveRecipe: function (module) {
            var that = this;
            var ngDirectiveFn = module.module.directive;

            module.module.directive = function (name, directiveFactory) {
                var info = { name: name, directiveFactory: directiveFactory };
                angular.forEach(that.hooks, function (hook) {
                    if (hook.methodType === that.MethodEnum.DIRECTIVE)
                        info = hook.hookFn(info.name, info.directiveFactory);
                });

                ngDirectiveFn(info.name, info.directiveFactory);
                return module.module;
            }
        },

        patchFactoryRecipe: function (module) {
            var that = this;
            var ngFactoryFn = module.module.factory;

            module.module.factory = function (name, providerFunction) {
                var info = { name: name, providerFunction: providerFunction };
                angular.forEach(that.hooks, function (hook) {
                    if (hook.methodType === that.MethodEnum.FACTORY)
                        info = hook.hookFn(info.name, info.providerFunction);
                });

                ngFactoryFn(info.name, info.providerFunction);
                return module.module;
            }
        },

        patchFilterRecipe: function (module) {
            var that = this;
            var ngFilterFn = module.module.filter;

            module.module.filter = function (name, filterFactory) {
                var info = { name: name, filterFactory: filterFactory };
                angular.forEach(that.hooks, function (hook) {
                    if (hook.methodType === that.MethodEnum.FILTER)
                        info = hook.hookFn(info.name, info.filterFactory);
                });

                ngFilterFn(info.name, info.filterFactory);
                return module.module;
            }
        },

        patchRunBlock: function (module) {
            var that = this;
            var ngRunFn = module.module.run;

            module.module.run = function (block) {
                var modifiedBlock = block;
                angular.forEach(that.hooks, function (hook) {
                    if (hook.methodType === that.MethodEnum.RUN_BLOCK)
                        modifiedBlock = hook.hookFn(modifiedBlock);
                });

                ngRunFn(modifiedBlock);
                return module.module;
            }
        },

        patchServiceRecipe: function (module) {
            var that = this;
            var ngServiceFn = module.module.service;

            module.module.service = function (name, constructor) {
                var info = { name: name, constructor: constructor };
                angular.forEach(that.hooks, function (hook) {
                    if (hook.methodType === that.MethodEnum.SERVICE)
                        info = hook.hookFn(info.name, info.constructor);
                });

                ngServiceFn(info.name, info.constructor);
                return module.module;
            }
        },

        registerHook: function (methodType, hookFn) {
            var hook = new this.Hook(methodType, hookFn);
            this.hooks.push(hook);
            return hook.id;
        },

        unregisterHook: function (id) {
            var result = [];
            angular.forEach(this.hooks, function (hook) {
                if (hook.id !== id)
                    result.push(hook);
            });
            this.hooks = result;
        }
    };

    Mangle.prototype.MethodEnum = {
        ANIMATION: 0,
        CONTROLLER: 1,
        DECORATOR: 2,
        DIRECTIVE: 3,
        FACTORY: 4,
        FILTER: 5,
        MODULE: 6,
        RUN_BLOCK: 7,
        SERVICE: 8
    };

    Mangle.prototype.Hook = function (methodType, hookFn) {
        this.id = ++hookId;
        this.methodType = methodType;
        this.hookFn = hookFn;
    };

    Mangle.prototype.Module = function (name, module) {
        this.name = name;
        this.module = module;
    }


    initialize();

})(this);