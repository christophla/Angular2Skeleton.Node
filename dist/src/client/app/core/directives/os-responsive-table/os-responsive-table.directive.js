/// <reference path="../../core.module.ts" />
var Core;
(function (Core) {
    /**
     * Reponsive Table Directive
     */
    class ResponsiveTableDirective {
        constructor() {
            this.restrict = 'A';
        }
        link(scope, instanceElement) {
            // Wrap the table
            var wrapper = angular.element('<div class="os-responsive-table-wrapper"></div>');
            instanceElement.after(wrapper);
            wrapper.append(instanceElement);
        }
    }
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .directive('osResponsiveTable', () => new ResponsiveTableDirective());
})(Core || (Core = {}));
//# sourceMappingURL=os-responsive-table.directive.js.map