(function() {
    "use strict";

    var CURLY = new Stooge("Curly", "Howard");
    var CURLY_JOE = new Stooge("Curly Joe", "DeRita");
    var JOE = new Stooge("Joe", "Besser");
    var LARRY = new Stooge("Larry", "Fine");
    var MOE = new Stooge("Moe", "Howard");
    var SHEMP = new Stooge("Shemp", "Howard");


    angular
        .module("stoogeStudio30", [])
        .value("lineup", [MOE, LARRY, SHEMP]);

    angular
        .module("stoogeStudio33", [])
        .value("lineup", [MOE, LARRY, CURLY]);

    angular
        .module("stoogeStudio46", [])
        .value("lineup", [MOE, LARRY, SHEMP]);

    angular
        .module("stoogeStudio56", [])
        .value("lineup", [MOE, LARRY, JOE]);

    angular
        .module("stoogeStudio58", [])
        .value("lineup", [MOE, LARRY, CURLY_JOE]);

    angular.module("stoogeStudioLib", ["stoogeStudio30", "stoogeStudio33", "stoogeStudio46", "stoogeStudio56", "stoogeStudio58"]);


    function Stooge(firstName, lastName) {
        var that = this;
        that.firstName = firstName;
        that.lastName = lastName;

        that.getFullName = function() {
            return that.firstName + " " + that.lastName;
        }
    }
})();