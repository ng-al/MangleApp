(function() {
    "use strict";

    angular
        .module("apMangleApp")
        .controller("counterCtrl2",
        ["$scope", "counterService",
        function($scope, counterService) {
            var vm = this;
            vm.controllerName = "counterCtrl2";
            vm.counter = counterService;
        }]);
})();