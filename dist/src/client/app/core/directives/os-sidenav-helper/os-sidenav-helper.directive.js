/// <reference path="../../core.module.ts" />
var Core;
(function (Core) {
    // TODO: Scope MdSidenavCtrl
    /**
     * Sidenav Helper Directive
     */
    class SidenavHelperDirective {
        constructor() {
            this.restrict = 'A';
            this.require = '^mdSidenav';
        }
        link(scope, instanceElement, instanceAttributes, MdSidenavCtrl) {
            // Watch md-sidenav open & locked open statuses
            // and add class to the ".page-layout" if only
            // the sidenav open and NOT locked open
            scope.$watch(() => (MdSidenavCtrl.isOpen() && !MdSidenavCtrl.isLockedOpen()), current => {
                if (angular.isUndefined(current)) {
                    return;
                }
                instanceElement.parent().toggleClass('full-height', current);
                angular.element('html').toggleClass('sidenav-open', current);
            });
        }
    }
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .directive('osSidenavHelper', () => new SidenavHelperDirective());
})(Core || (Core = {}));
//# sourceMappingURL=os-sidenav-helper.directive.js.map