
/**
 * Sidenav Helper Directive
 */
export class SidenavHelperDirective implements ng.IDirective {

    public restrict = 'A';
    public require = '^mdSidenav';

    public link(
        scope: ng.IScope,
        instanceElement: ng.IAugmentedJQuery,
        instanceAttributes: ng.IAttributes,
        MdSidenavCtrl: any) {

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



