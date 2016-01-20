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
                .when("/namespace", { templateUrl: "/namespace/namespace.html" })
                .otherwise({ redirectTo: "/home" });
        }]);
})();