"use strict";
/**
 * Search Bar Directive
 */
var SearchBarDirective = (function () {
    /**
     * Constructor
     * @param $document The document service
     */
    function SearchBarDirective($document) {
        var _this = this;
        this.$document = $document;
        this.restrict = 'E';
        this.scope = true;
        this.templateUrl = 'app/core/directives/os-search-bar/os-search-bar.html';
        this.compile = function (templateElement) {
            // Add class
            templateElement.addClass('os-search-bar');
            return function (scope, iElement) {
                var vm = _this;
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
    SearchBarDirective.factory = function () {
        var directive = function ($document) { return new SearchBarDirective($document); };
        directive.$inject = ['$document'];
        return directive;
    };
    return SearchBarDirective;
}());
exports.SearchBarDirective = SearchBarDirective;
//# sourceMappingURL=directive.js.map