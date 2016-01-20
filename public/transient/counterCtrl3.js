// Copyright (c) Alvin Pivowar 2015, 2016

(function() {
    "use strict";

    angular
        .module("apMangleApp")
        .controller("counterCtrl3",
        ["counterService as transient",
        function(counterService) {
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