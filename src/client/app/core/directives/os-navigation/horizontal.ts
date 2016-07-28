
import {INavigationService} from './service';

/**
 * Navigation horizontal directive
 */
export class NavigationHorizontalDirective implements ng.IDirective {

    public restrict = 'E';

    public scope = { root: '@' };
    public controller = 'OsNavigationController as vm';
    public templateUrl = 'app/core/directives/os-navigation/templates/horizontal.html';
    public transclude = true;

    public static factory(): ng.IDirectiveFactory {
        var directive = (osNavigationService: INavigationService) => new NavigationHorizontalDirective(osNavigationService);
        directive.$inject = ['osNavigationService'];
        return directive;
    }

    constructor(private osNavigationService: INavigationService) { }

    public compile = (templateElement: ng.IAugmentedJQuery) => {

        templateElement.addClass('os-navigation-horizontal');

        return scope => {
            // Store the navigation in the service for public access
            this.osNavigationService.setNavigationScope(scope);
        };
    };

}

/**
 * Navigation horizontal node directive
 */
export class NavigationHorizontalNodeDirective implements ng.IDirective {

    public restrict = 'A';
    public bindToController = { node: '=osNavigationHorizontalNode' };
    public controller = 'MsNavigationHorizontalNodeController as vm';

    public compile = (templateElement: ng.IAugmentedJQuery) => {

        templateElement.addClass('os-navigation-horizontal-node');

        return (
            scope: ng.IScope,
            iElement: ng.IAugmentedJQuery,
            templateAttributes: ng.IAttributes,
            MsNavigationHorizontalNodeCtrl
        ) => {
            // Add custom classes
            iElement.addClass(MsNavigationHorizontalNodeCtrl.getClass());

            // Add group class if it's a group
            if (MsNavigationHorizontalNodeCtrl.group) {
                iElement.addClass('group');
            }
        };

    };
}

/**
 * Navigation horizontal item directive
 */
export class NavigationHorizontalItemDirective implements ng.IDirective {

    public restrict = 'A';
    public require = '^osNavigationHorizontalNode';

    public static factory(): ng.IDirectiveFactory {
        var directive = ($mdMedia: any) => new NavigationHorizontalItemDirective($mdMedia);
        directive.$inject = ['$mdMedia'];
        return directive;
    }

    constructor(private $mdMedia: any) { }

    public compile = (templateElement: ng.IAugmentedJQuery) => {

        templateElement.addClass('os-navigation-horizontal-item');

        return (
            scope: ng.IScope,
            iElement: ng.IAugmentedJQuery,
            templateAttributes: ng.IAttributes,
            MsNavigationHorizontalNodeCtrl: INavigationHorizontalNodeController
        ) => {

            var onClick = () => {
                if (!MsNavigationHorizontalNodeCtrl.hasChildren || this.$mdMedia('gt-md')) {
                    return;
                }
                iElement.toggleClass('expanded');
            };
            iElement.on('click', onClick);

            // Cleanup
            scope.$on('$destroy', () => {
                iElement.off('click');
            });
        };
    };

}

/**
 * Navigation horizontal node controller
 */
export interface INavigationHorizontalNodeController {
    element: ng.IAugmentedJQuery;
    group: any;
    hasChildren: boolean;
    getClass(): any;
}

/**
 * Navigation horizontal node controller implementation
 */
export class NavigationHorizontalNodeController {

    public element = undefined;
    public group = undefined;
    public hasChildren = undefined;
    public node = undefined;

    private isActive: boolean;

    /**
     * Creates a new instance of the navigation horizontal node controller
     *
     * @param $scope                The scope
     * @param $element              The element service
     * @param $rootScope            The root scope
     * @param $state                The route state service
     * @param osNavigationService   The navigation service
     */
    constructor(
        private $scope: any,
        private $element: ng.IAugmentedJQuery,
        private $rootScope: ng.IRootScopeService,
        private $state: ng.ui.IStateService,
        private osNavigationService: INavigationService
    ) {

        this.element = $element;
        this.node = $scope.node;

        this.init();
    }

    /**
     * Return the class
     *
     * @returns {*}
     */
    public getClass = () => {
        return this.node.class;
    }

    /**
     * Initialize
     */
    private init() {
        // Setup the initial values

        // Is active
        this.isActive = false;

        // Has children?
        this.hasChildren = this.node.children.length > 0;

        // Is group?
        this.group = !!(angular.isDefined(this.node.group) && this.node.group === true);

        // Mark all parents as active if we have a matching state
        // or the current state is a child of the node's state
        if (this.node.state === this.$state.current.name || this.$state.includes(this.node.state)) {

            // If state params are defined, make sure they are
            // equal, otherwise do not set the active item
            if (angular.isDefined(this.node.stateParams) && angular.isDefined(this.$state.params) && !angular.equals(this.node.stateParams, this.$state.params)) {
                return;
            }

            this.$scope.$emit('osNavigation::stateMatched');

            // Also store the current active menu item
            this.osNavigationService.setActiveItem(this.node, this.$scope);
        }

        this.$scope.$on('osNavigation::stateMatched', () => {
            // Mark as active if has children
            if (this.hasChildren) {
                this.$scope.$evalAsync(() => {
                    this.isActive = true;
                });
            }
        });

        // Listen for clearActive event
        this.$scope.$on('osNavigation::clearActive', () => {
            if (!this.hasChildren) {
                return;
            }

            var activePathParts = [];

            var activeItem = this.osNavigationService.getActiveItem();
            if (activeItem) {
                activePathParts = activeItem.node._path.split('.');
            }

            // Test for active path
            if (activePathParts.indexOf(this.node._id) > -1) {
                this.$scope.$evalAsync(() => {
                    this.isActive = true;
                });
            } else {
                this.$scope.$evalAsync(() => {
                    this.isActive = false;
                });
            }

        });

        // Listen for $stateChangeSuccess event
        this.$scope.$on('$stateChangeSuccess', () => {
            if (this.node.state === this.$state.current.name) {

                // If state params are defined, make sure they are
                // equal, otherwise do not set the active item
                if (angular.isDefined(this.node.stateParams) &&
                    angular.isDefined(this.$state.params) &&
                    !angular.equals(this.node.stateParams, this.$state.params)) {
                    return;
                }

                // Update active item on state change
                this.osNavigationService.setActiveItem(this.node, this.$scope);

                // Clear all active states everything except the one we're using
                this.$rootScope.$broadcast('osNavigation::clearActive');
            }
        });

    }

}

