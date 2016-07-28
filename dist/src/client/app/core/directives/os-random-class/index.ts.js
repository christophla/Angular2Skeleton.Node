/// <reference path="../../core.module.ts" />
var Core;
(function (Core) {
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
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .directive('osRandomClass', () => new RandomClassDirective());
})(Core || (Core = {}));
//# sourceMappingURL=index.ts.js.map