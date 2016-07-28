﻿
import {INavigationService} from './service';

/**
 * Navigation directive
 */
export class NavigationDirective implements ng.IDirective {

    public restrict = 'E';
    public scope = {
        folded: '=',
        root: '@'
    };
    public controller = 'OsNavigationController as vm';
    public templateUrl = 'app/core/directives/os-navigation/templates/vertical.html';
    public transclude = true;

    public static factory(): ng.IDirectiveFactory {

        var directive = (
            $rootScope: ng.IRootScopeService,
            $timeout: ng.ITimeoutService,
            $mdSidenav: any,
            osNavigationService: INavigationService
        ) =>
            new NavigationDirective($rootScope, $timeout, $mdSidenav, osNavigationService);

        directive.$inject = ['$rootScope', '$timeout', '$mdSidenav', 'osNavigationService'];

        return directive;
    }

    constructor(
        private $rootScope: any,
        private $timeout: any,
        private $mdSidenav: any,
        private osNavigationService: INavigationService
    ) {
    }

    public compile = (templateElement: ng.IAugmentedJQuery) => {

        templateElement.addClass('os-navigation');

        return (scope: any, iElement: ng.IAugmentedJQuery) => {

            var vm = this;
            var bodyEl = angular.element('body'),
                foldExpanderEl = angular.element('<div id="os-navigation-fold-expander"></div>'),
                foldCollapserEl = angular.element('<div id="os-navigation-fold-collapser"></div>'),
                sidenav = vm.$mdSidenav('navigation');

            // Store the navigation in the service for public access
            vm.osNavigationService.setNavigationScope(scope);

            // Set the folded status for the first time.
            // First, we have to check if we have a folded
            // status available in the service already. This
            // will prevent navigation to act weird if we already
            // set the fold status, remove the navigation and
            // then re-initialize it, which happens if we
            // change to a view without a navigation and then
            // come back with history.back() function.

            // If the service didn't initialize before, set
            // the folded status from scope, otherwise we
            // won't touch anything because the folded status
            // already set in the service...
            if (vm.osNavigationService.getFolded() === null) {
                vm.osNavigationService.setFolded(scope.folded);
            }

            if (vm.osNavigationService.getFolded()) {
                // Collapse everything.
                // This must be inside a $timeout because by the
                // time we call this, the 'osNavigation::collapse'
                // event listener is not registered yet. $timeout
                // will ensure that it will be called after it is
                // registered.
                vm.$timeout(() => {
                    vm.$rootScope.$broadcast('osNavigation::collapse');
                });

                // Add class to the body
                bodyEl.addClass('os-navigation-folded');

                // Set fold expander
                setFoldExpander();

            }

            // Sidenav locked open status watcher
            scope.$watch(() => sidenav.isLockedOpen(), (current, old) => {
                if (angular.isUndefined(current) || angular.equals(current, old)) {
                    return;
                }

                var folded = vm.osNavigationService.getFolded();

                if (folded) {
                    if (current) {
                        // Collapse everything
                        vm.$rootScope.$broadcast('osNavigation::collapse');
                    } else {
                        // Expand the active one and its parents
                        var activeItem = vm.osNavigationService.getActiveItem();
                        if (activeItem) {
                            activeItem.scope.$emit('osNavigation::stateMatched');
                        }
                    }
                }
            });

            // Folded status watcher
            scope.$watch('folded', (current, old) => {
                if (angular.isUndefined(current) || angular.equals(current, old)) {
                    return;
                }

                setFolded(current);
            });

            /**
             * Set folded status
             *
             * @param folded
             */
            function setFolded(folded: any) {
                // Store folded status on the service for global access
                vm.osNavigationService.setFolded(folded);

                if (folded) {
                    // Collapse everything
                    vm.$rootScope.$broadcast('osNavigation::collapse');

                    // Add class to the body
                    bodyEl.addClass('os-navigation-folded');

                    // Set fold expander
                    setFoldExpander();
                } else {
                    // Expand the active one and its parents
                    var activeItem = vm.osNavigationService.getActiveItem();
                    if (activeItem) {
                        activeItem.scope.$emit('osNavigation::stateMatched');
                    }

                    // Remove body class
                    bodyEl.removeClass('os-navigation-folded os-navigation-folded-open');

                    // Remove fold collapser
                    removeFoldCollapser();
                }
            }

            /**
             * Set fold expander
             */
            function setFoldExpander() {
                iElement.parent().append(foldExpanderEl);

                // Let everything settle for a moment
                // before registering the event listener
                vm.$timeout(() => {
                    foldExpanderEl.on('mouseenter touchstart', onFoldExpanderHover);
                });
            }

            /**
             * Set fold collapser
             */
            function setFoldCollapser() {
                bodyEl.find('#main').append(foldCollapserEl);
                foldCollapserEl.on('mouseenter touchstart', onFoldCollapserHover);
            }

            /**
             * Remove fold collapser
             */
            function removeFoldCollapser() {
                foldCollapserEl.remove();
            }

            /**
             * onHover event of foldExpander
             */
            function onFoldExpanderHover(event: any) {
                if (event) {
                    event.preventDefault();
                }

                // Set folded open status
                vm.osNavigationService.setFoldedOpen(true);

                // Expand the active one and its parents
                var activeItem = vm.osNavigationService.getActiveItem();
                if (activeItem) {
                    activeItem.scope.$emit('osNavigation::stateMatched');
                }

                // Add class to the body
                bodyEl.addClass('os-navigation-folded-open');

                // Remove the fold opener
                foldExpanderEl.remove();

                // Set fold collapser
                setFoldCollapser();
            }

            /**
             * onHover event of foldCollapser
             */
            function onFoldCollapserHover(event?: any) {
                if (event) {
                    event.preventDefault();
                }

                // Set folded open status
                vm.osNavigationService.setFoldedOpen(false);

                // Collapse everything
                vm.$rootScope.$broadcast('osNavigation::collapse');

                // Remove body class
                bodyEl.removeClass('os-navigation-folded-open');

                // Remove the fold collapser
                foldCollapserEl.remove();

                // Set fold expander
                setFoldExpander();
            }

            /**
             * Public access for toggling folded status externally
             */
            scope.toggleFolded = () => {
                var folded = vm.osNavigationService.getFolded();

                setFolded(!folded);
            };

            /**
             * On $stateChangeStart
             */
            scope.$on('$stateChangeStart', () => {
                // Close the sidenav
                sidenav.close();

                // If navigation is folded open, close it
                if (vm.osNavigationService.getFolded()) {
                    onFoldCollapserHover();
                }
            });

            // Cleanup
            scope.$on('$destroy', () => {
                foldCollapserEl.off('mouseenter touchstart');
                foldExpanderEl.off('mouseenter touchstart');
            });
        };
    };

}

/**
 * Navigation node directive
 */
export class NavigationNodeDirective implements ng.IDirective {

    public restrict = 'A';
    public bindToController = {
        node: '=osNavigationNode'
    };
    public controller = 'MsNavigationNodeController as vm';

    public compile = (templateElement: ng.IAugmentedJQuery) => {

        templateElement.addClass('os-navigation-node');

        return (scope: ng.IScope,
            iElement: ng.IAugmentedJQuery,
            templateAttributes: ng.IAttributes,
            MsNavigationNodeCtrl: INavigationNodeController) => {

            // Add custom classes
            iElement.addClass(MsNavigationNodeCtrl.getClass());

            // Add group class if it's a group
            if (MsNavigationNodeCtrl.group) {
                iElement.addClass('group');
            }
        };
    };
}

/**
 * Navigation item directive
 */
export class NavigationItemDirective implements ng.IDirective {

    public restrict = 'A';
    public require = '^osNavigationNode';

    public compile = (templateElement: ng.IAugmentedJQuery) => {

        templateElement.addClass('os-navigation-item');

        return (scope: ng.IScope, iElement: ng.IAugmentedJQuery, iAttrs, MsNavigationNodeCtrl: any) => {

            // If the item is collapsable...
            if (MsNavigationNodeCtrl.collapsable) {
                iElement.on('click', MsNavigationNodeCtrl.toggleCollapsed);
            }

            // Cleanup
            scope.$on('$destroy', () => {
                iElement.off('click');
            });
        };

    };
}

/**
 * Navigation node controller
 */
export interface INavigationNodeController {
    collapsable: boolean;
    collapsed: boolean;
    group: any;
    hasChildren: boolean;
    collapse(): void;
    expand(): void;
    getClass(): any;
    toggleCollapsed(): void;
}

/**
 * Navigation node controller implementation
 */
export class NavigationNodeController implements INavigationNodeController {

    public element: ng.IAugmentedJQuery;
    public node: any;
    public hasChildren = undefined;
    public collapsed = undefined;
    public collapsable = undefined;
    public group = undefined;
    private animateHeightClass = 'animate-height';

    /**
     * Creates a new instance of the navigation node controller
     *
     * @param $scope                The scope
     * @param $element              The element service
     * @param $rootScope            The root scope
     * @param $animate              The animation service
     * @param $state                The route state service
     * @param osNavigationService   The navigation service
     */
    constructor(
        private $scope: any,
        private $element: ng.IAugmentedJQuery,
        private $rootScope: ng.IRootScopeService,
        private $animate: ng.animate.IAnimateService,
        private $state: ng.ui.IStateService,
        private osNavigationService: INavigationService
    ) {

        this.element = $element;
        this.node = $scope.node;

        this.init();
    }

    /**
     * Toggle collapsed
     */
    public toggleCollapsed = () => {
        if (this.collapsed) {
            this.expand();
        } else {
            this.collapse();
        }
    };

    /**
	* Collapse
	*/
    public collapse = () => {
        // Grab the element that we are going to collapse
        var collapseEl = this.element.children('ul');

        // Grab the height
        var height = collapseEl[0].offsetHeight;

        this.$scope.$evalAsync(() => {
            // Set collapsed status
            this.collapsed = true;

            // Add collapsing class to the node
            this.element.addClass('collapsing');

            // Animate the height
            this.$animate.animate(collapseEl,
                {
                    'display': 'block',
                    'height': height + 'px'
                },
                {
                    'height': '0px'
                },
                this.animateHeightClass
            ).then(
                () => {
                    // Clear the inline styles after animation done
                    collapseEl.css({
                        'display': '',
                        'height': ''
                    });

                    // Clear collapsing class from the node
                    this.element.removeClass('collapsing');
                }
                );

            // Broadcast the collapse event so child items can also be collapsed
            this.$scope.$broadcast('osNavigation::collapse');
        });
    };

    /**
	* Expand
	*/
    public expand = () => {
        // Grab the element that we are going to expand
        var expandEl = this.element.children('ul');

        // Move the element out of the dom flow and
        // make it block so we can get its height
        expandEl.css({
            'position': 'absolute',
            'visibility': 'hidden',
            'display': 'block',
            'height': 'auto'
        });

        // Grab the height
        var height = expandEl[0].offsetHeight;

        // Reset the style modifications
        expandEl.css({
            'position': '',
            'visibility': '',
            'display': '',
            'height': ''
        });

        this.$scope.$evalAsync(() => {
            // Set collapsed status
            this.collapsed = false;

            // Add expanding class to the node
            this.element.addClass('expanding');

            // Animate the height
            this.$animate.animate(expandEl,
                {
                    'display': 'block',
                    'height': '0px'
                },
                {
                    'height': height + 'px'
                },
                this.animateHeightClass
            ).then(
                () => {
                    // Clear the inline styles after animation done
                    expandEl.css({
                        'height': ''
                    });

                    // Clear expanding class from the node
                    this.element.removeClass('expanding');
                }
                );

            // If item expanded, broadcast the collapse event from rootScope so that the other expanded items
            // can be collapsed. This is necessary for keeping only one parent expanded at any time
            this.$rootScope.$broadcast('osNavigation::collapse', this.node._path);
        });
    };

    /**
	* Return the class
	*
	* @returns {*}
	*/
    public getClass = () => {
        return this.node.class;
    };


    /**
     * Initializes the control
     */
    private init() {
        // Setup the initial values

        // Has children?
        this.hasChildren = this.node.children.length > 0;

        // Is group?
        this.group = !!(angular.isDefined(this.node.group) && this.node.group === true);

        // Is collapsable?
        if (!this.hasChildren || this.group) {
            this.collapsable = false;
        } else {
            this.collapsable = !!(angular.isUndefined(this.node.collapsable) || typeof this.node.collapsable !== 'boolean' || this.node.collapsable === true);
        }

        // Is collapsed?
        if (!this.collapsable) {
            this.collapsed = false;
        } else {
            this.collapsed = !!(angular.isUndefined(this.node.collapsed) || typeof this.node.collapsed !== 'boolean' || this.node.collapsed === true);
        }

        // Expand all parents if we have a matching state or
        // the current state is a child of the node's state
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
            // Expand if the current scope is collapsable and is collapsed
            if (this.collapsable && this.collapsed) {
                this.$scope.$evalAsync(() => {
                    this.collapsed = false;
                });
            }
        });

        // Listen for collapse event
        this.$scope.$on('osNavigation::collapse', (event, path) => {
            if (this.collapsed || !this.collapsable) {
                return;
            }

            // If there is no path defined, collapse
            if (angular.isUndefined(path)) {
                this.collapse();
            }
            // If there is a path defined, do not collapse
            // the items that are inside that path. This will
            // prevent parent items from collapsing
            else {
                var givenPathParts = path.split('.'),
                    activePathParts = [];

                var activeItem = this.osNavigationService.getActiveItem();
                if (activeItem) {
                    activePathParts = activeItem.node._path.split('.');
                }

                // Test for given path
                if (givenPathParts.indexOf(this.node._id) > -1) {
                    return;
                }

                // Test for active path
                if (activePathParts.indexOf(this.node._id) > -1) {
                    return;
                }

                this.collapse();
            }
        });

        // Listen for $stateChangeSuccess event
        this.$scope.$on('$stateChangeSuccess', () => {
            if (this.node.state === this.$state.current.name) {
                // If state params are defined, make sure they are
                // equal, otherwise do not set the active item
                if (angular.isDefined(this.node.stateParams) && angular.isDefined(this.$state.params) && !angular.equals(this.node.stateParams, this.$state.params)) {
                    return;
                }

                // Update active item on state change
                this.osNavigationService.setActiveItem(this.node, this.$scope);

                // Collapse everything except the one we're using
                this.$rootScope.$broadcast('osNavigation::collapse', this.node._path);
            }
        });
    }

}
