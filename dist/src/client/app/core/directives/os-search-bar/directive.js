"use strict";
/**
 * Search Bar Directive
 */
class SearchBarDirective {
    /**
     * Constructor
     * @param $document The document service
     */
    constructor($document) {
        this.$document = $document;
        this.restrict = 'E';
        this.scope = true;
        this.templateUrl = 'app/core/directives/os-search-bar/os-search-bar.html';
        this.compile = (templateElement) => {
            // Add class
            templateElement.addClass('os-search-bar');
            return (scope, iElement) => {
                var vm = this;
                var collapserEl;
                var expanderEl;
                // Initialize
                function init() {
                    expanderEl = iElement.find('#os-search-bar-expander');
                    collapserEl = iElement.find('#os-search-bar-collapser');
                    expanderEl.on('click', expand);
                    collapserEl.on('click', collapse);
                }
                init();
                /**
                 * Expand
                 */
                function expand() {
                    iElement.addClass('expanded'); // TODO: Use Bind
                    // Esc key event
                    vm.$document.on('keyup', escKeyEvent);
                }
                /**
                 * Collapse
                 */
                function collapse() {
                    iElement.removeClass('expanded');
                }
                /**
                 * Escape key event
                 *
                 * @param e
                 */
                function escKeyEvent(e) {
                    if (e.keyCode === 27) {
                        collapse();
                        vm.$document.off('keyup', escKeyEvent);
                    }
                }
            };
        };
    }
    static factory() {
        var directive = ($document) => new SearchBarDirective($document);
        directive.$inject = ['$document'];
        return directive;
    }
}
exports.SearchBarDirective = SearchBarDirective;
//# sourceMappingURL=directive.js.map