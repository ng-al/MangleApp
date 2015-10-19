(function() {
    "use strict";

    angular
        .module("apMangleApp")
        .controller("counterCtrl4",
        ["$scope", "counterService as transient",
        function($scope, counterService) {
            var vm = this;
            vm.controllerName = "counterCtrl4";
            vm.counter = counterService;
        }]);
})();