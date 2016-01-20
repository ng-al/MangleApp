// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("apMangleApp")
        .controller("counterCtrl4",
        ["counterService as transient",
        function(counterService) {
            var vm = this;
            vm.controllerName = "counterCtrl4";
            vm.counter = counterService;
        }]);
})();