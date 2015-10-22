(function() {
    "use strict";

    var MENU_ITEMS = [];

    angular
        .module("apMangleApp")
        .controller("navCtrl",
        ["$location",
        function($location) {
            var vm = this;
            vm.getMenuItems = getMenuItems;

            init();

            function getMenuItems() {
                var result = [];

                angular.forEach(MENU_ITEMS, function(item) {
                    var isActive = (item.url.substring(1) === $location.path());
                    item.class = isActive ? "active" : "";
                    result.push(item);
                });

                return result;
            }

            function init() {
                MENU_ITEMS = [];
                MENU_ITEMS.push(new MenuItem("Mangle!", "#/home"));
                MENU_ITEMS.push(new MenuItem("Non-Singleton Services", "#/transient"));
                MENU_ITEMS.push(new MenuItem("Namespaces", "#/namespace"));
                MENU_ITEMS.push(new MenuItem("Page3", "#/page3"));
            }
        }]);

    function MenuItem(name, url) {
        this.class = null;
        this.name = name;
        this.url = url;
    }
})();