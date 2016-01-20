// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("apMangleApp")
        .controller("studio30Ctrl",
        ["stoogeStudio30.lineup",
        function(lineup) {
            var vm = this;
            vm.stooges = lineup;
        }]);

    angular
        .module("apMangleApp")
        .controller("studio33Ctrl",
        ["stoogeStudio33.lineup",
        function(lineup) {
            var vm = this;
            vm.stooges = lineup;
        }]);

    angular
        .module("apMangleApp")
        .controller("studio46Ctrl",
        ["stoogeStudio46.lineup",
        function(lineup) {
            var vm = this;
            vm.stooges = lineup;
        }]);

    angular
        .module("apMangleApp")
        .controller("studio56Ctrl",
        ["stoogeStudio56.lineup",
        function(lineup) {
            var vm = this;
            vm.stooges = lineup;
        }]);

    angular
        .module("apMangleApp")
        .controller("studio58Ctrl",
        ["stoogeStudio58.lineup",
        function(lineup) {
            var vm = this;
            vm.stooges = lineup;
        }]);

    angular
        .module("apMangleApp")
        .controller("studioInjectCtrl",
        ["$injector",
        function($injector) {
            var vm = this;
            vm.moduleName = null;
            vm.stooges = [];

            vm.onModuleChange = onModuleChange;

            init();

            function init() {
                vm.moduleName = "stoogeStudio30";
                onModuleChange();
            }

            function onModuleChange() {
                vm.stooges = $injector.get(vm.moduleName + ".lineup");
            }
        }]);
})();