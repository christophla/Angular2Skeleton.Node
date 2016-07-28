"use strict";
/**
 * Random Class Directive
 */
class RandomClassDirective {
    constructor() {
        this.restrict = 'A';
        this.scope = {
            osRandomClass: '='
        };
        this.link = (scope, instanceElement) => {
            var randomClass = scope.osRandomClass[Math.floor(Math.random() * (scope.osRandomClass.length))];
            instanceElement.addClass(randomClass);
        };
    }
}
exports.RandomClassDirective = RandomClassDirective;
//# sourceMappingURL=directive.js.map