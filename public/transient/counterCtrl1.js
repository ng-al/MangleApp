// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("apMangleApp")
        .controller("counterCtrl1",
        ["$scope", "counterService",
        function($scope, counterService) {
            var vm = this;
            vm.controllerName = "counterCtrl1";
            vm.counter = counterService;
        }]);
})();