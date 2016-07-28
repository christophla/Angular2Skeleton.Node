"use strict";
/**
 * Random Class Directive
 */
var RandomClassDirective = (function () {
    function RandomClassDirective() {
        this.restrict = 'A';
        this.scope = {
            osRandomClass: '='
        };
        this.link = function (scope, instanceElement) {
            var randomClass = scope.osRandomClass[Math.floor(Math.random() * (scope.osRandomClass.length))];
            instanceElement.addClass(randomClass);
        };
    }
    return RandomClassDirective;
}());
exports.RandomClassDirective = RandomClassDirective;
//# sourceMappingURL=directive.js.map