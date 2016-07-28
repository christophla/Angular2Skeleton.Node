"use strict";
/**
 * Reponsive Table Directive
 */
var ResponsiveTableDirective = (function () {
    function ResponsiveTableDirective() {
        this.restrict = 'A';
    }
    ResponsiveTableDirective.prototype.link = function (scope, instanceElement) {
        // Wrap the table
        var wrapper = angular.element('<div class="os-responsive-table-wrapper"></div>');
        instanceElement.after(wrapper);
        wrapper.append(instanceElement);
    };
    return ResponsiveTableDirective;
}());
exports.ResponsiveTableDirective = ResponsiveTableDirective;
//# sourceMappingURL=directive.js.map