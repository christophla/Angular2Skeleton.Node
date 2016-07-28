
/**
 * Search Bar Directive
 */
export class SearchBarDirective implements ng.IDirective {

    public restrict = 'E';
    public scope = true;
    public templateUrl = 'app/core/directives/os-search-bar/os-search-bar.html';

    public static factory(): ng.IDirectiveFactory {
        var directive = ($document: ng.IDocumentService) => new SearchBarDirective($document);
        directive.$inject = ['$document'];
        return directive;
    }

    /**
     * Constructor
     * @param $document The document service
     */
    constructor(private $document: ng.IDocumentService) { }

    public compile = (templateElement: ng.IAugmentedJQuery) => {

        // Add class
        templateElement.addClass('os-search-bar');

        return (scope: ng.IScope, iElement: ng.IAugmentedJQuery) => {

            var vm = this;
            var collapserEl: any;
            var expanderEl: any;

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
            function escKeyEvent(e: any) {
                if (e.keyCode === 27) {
                    collapse();
                    vm.$document.off('keyup', escKeyEvent);
                }
            }
        };
    };

}
