
/**
 * Reponsive Table Directive
 */
export class ResponsiveTableDirective implements ng.IDirective {
    public restrict = 'A';

    public link(scope: ng.IScope, instanceElement: ng.IAugmentedJQuery) {

        // Wrap the table
        var wrapper = angular.element('<div class="os-responsive-table-wrapper"></div>');
        instanceElement.after(wrapper);
        wrapper.append(instanceElement);
    }
}
