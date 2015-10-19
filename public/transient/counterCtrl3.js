(function() {
    "use strict";

    angular
        .module("apMangleApp")
        .controller("counterCtrl3",
        ["$scope", "counterService as transient",
        function($scope, counterService) {
            var vm = this;
            vm.controllerName = "counterCtrl3";
            vm.counter = counterService;

            init();

            function init() {
                if (!counterService.$share.hasOwnProperty("total"))
                    counterService.$share.total = 100;
            }
        }]);
})();