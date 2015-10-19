(function() {
    "use strict";

    angular
        .module("apMangleApp")
        .config(
        ["$routeProvider",
        function($routeProvider) {
            $routeProvider
                .when("/home", { templateUrl: "/home/home.html" })
                .when("/transient", { templateUrl: "/transient/transient.html" })
                .when("/page2", { templateUrl: "/page2.html" })
                .when("/page3", { templateUrl: "/page3.html" })
                .otherwise({ redirectTo: "/home" });
        }]);
})();