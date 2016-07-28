"use strict";
/**
 * Sidenav Helper Directive
 */
var SidenavHelperDirective = (function () {
    function SidenavHelperDirective() {
        this.restrict = 'A';
        this.require = '^mdSidenav';
    }
    SidenavHelperDirective.prototype.link = function (scope, instanceElement, instanceAttributes, MdSidenavCtrl) {
        // Watch md-sidenav open & locked open statuses
        // and add class to the ".page-layout" if only
        // the sidenav open and NOT locked open
        scope.$watch(function () { return (MdSidenavCtrl.isOpen() && !MdSidenavCtrl.isLockedOpen()); }, function (current) {
            if (angular.isUndefined(current)) {
                return;
            }
            instanceElement.parent().toggleClass('full-height', current);
            angular.element('html').toggleClass('sidenav-open', current);
        });
    };
    return SidenavHelperDirective;
}());
exports.SidenavHelperDirective = SidenavHelperDirective;
//# sourceMappingURL=directive.js.map