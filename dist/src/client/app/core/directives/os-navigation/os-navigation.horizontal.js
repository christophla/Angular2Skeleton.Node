/// <reference path="../../core.module.ts" />
var Core;
(function (Core) {
    /**
     * Navigation horizontal directive
     */
    class NavigationHorizontalDirective {
        constructor(osNavigationService) {
            this.osNavigationService = osNavigationService;
            this.restrict = 'E';
            this.scope = { root: '@' };
            this.controller = 'OsNavigationController as vm';
            this.templateUrl = 'app/core/directives/os-navigation/templates/horizontal.html';
            this.transclude = true;
            this.compile = (templateElement) => {
                templateElement.addClass('os-navigation-horizontal');
                return scope => {
                    // Store the navigation in the service for public access
                    this.osNavigationService.setNavigationScope(scope);
                };
            };
        }
        static factory() {
            var directive = (osNavigationService) => new NavigationHorizontalDirective(osNavigationService);
            directive.$inject = ['osNavigationService'];
            return directive;
        }
    }
    /**
     * Navigation horizontal node directive
     */
    class NavigationHorizontalNodeDirective {
        constructor() {
            this.restrict = 'A';
            this.bindToController = { node: '=osNavigationHorizontalNode' };
            this.controller = 'MsNavigationHorizontalNodeController as vm';
            this.compile = (templateElement) => {
                templateElement.addClass('os-navigation-horizontal-node');
                return (scope, iElement, templateAttributes, MsNavigationHorizontalNodeCtrl) => {
                    // Add custom classes
                    iElement.addClass(MsNavigationHorizontalNodeCtrl.getClass());
                    // Add group class if it's a group
                    if (MsNavigationHorizontalNodeCtrl.group) {
                        iElement.addClass('group');
                    }
                };
            };
        }
    }
    /**
     * Navigation horizontal item directive
     */
    class NavigationHorizontalItemDirective {
        constructor($mdMedia) {
            this.$mdMedia = $mdMedia;
            this.restrict = 'A';
            this.require = '^osNavigationHorizontalNode';
            this.compile = (templateElement) => {
                templateElement.addClass('os-navigation-horizontal-item');
                return (scope, iElement, templateAttributes, MsNavigationHorizontalNodeCtrl) => {
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
        static factory() {
            var directive = ($mdMedia) => new NavigationHorizontalItemDirective($mdMedia);
            directive.$inject = ['$mdMedia'];
            return directive;
        }
    }
    /**
     * Navigation horizontal node controller implementation
     */
    class NavigationHorizontalNodeController {
        /**
         * Creates a new instance of the navigation horizontal node controller
         *
         * @param $scope                The scope
         * @param $element              The element service
         * @param $rootScope            The root scope
         * @param $state                The route state service
         * @param osNavigationService   The navigation service
         */
        constructor($scope, $element, $rootScope, $state, osNavigationService) {
            this.$scope = $scope;
            this.$element = $element;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.osNavigationService = osNavigationService;
            this.element = undefined;
            this.node = undefined;
            this.hasChildren = undefined;
            this.group = undefined;
            /**
             * Return the class
             *
             * @returns {*}
             */
            this.getClass = () => {
                return this.node.class;
            };
            this.element = $element;
            this.node = $scope.node;
            this.init();
        }
        /**
         * Initialize
         */
        init() {
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
                }
                else {
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
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .directive('osNavigationHorizontal', NavigationHorizontalDirective.factory())
        .directive('osNavigationHorizontalNode', () => new NavigationHorizontalNodeDirective())
        .directive('osNavigationHorizontalItem', NavigationHorizontalItemDirective.factory())
        .controller('MsNavigationHorizontalNodeController', NavigationHorizontalNodeController);
})(Core || (Core = {}));
//# sourceMappingURL=os-navigation.horizontal.js.map