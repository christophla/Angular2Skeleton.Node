"use strict";
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
exports.ResponsiveTableDirective = ResponsiveTableDirective;
//# sourceMappingURL=directive.js.map