"use strict";
/**
 * Navigation horizontal directive
 */
var NavigationHorizontalDirective = (function () {
    function NavigationHorizontalDirective(osNavigationService) {
        var _this = this;
        this.osNavigationService = osNavigationService;
        this.restrict = 'E';
        this.scope = { root: '@' };
        this.controller = 'OsNavigationController as vm';
        this.templateUrl = 'app/core/directives/os-navigation/templates/horizontal.html';
        this.transclude = true;
        this.compile = function (templateElement) {
            templateElement.addClass('os-navigation-horizontal');
            return function (scope) {
                // Store the navigation in the service for public access
                _this.osNavigationService.setNavigationScope(scope);
            };
        };
    }
    NavigationHorizontalDirective.factory = function () {
        var directive = function (osNavigationService) { return new NavigationHorizontalDirective(osNavigationService); };
        directive.$inject = ['osNavigationService'];
        return directive;
    };
    return NavigationHorizontalDirective;
}());
exports.NavigationHorizontalDirective = NavigationHorizontalDirective;
/**
 * Navigation horizontal node directive
 */
var NavigationHorizontalNodeDirective = (function () {
    function NavigationHorizontalNodeDirective() {
        this.restrict = 'A';
        this.bindToController = { node: '=osNavigationHorizontalNode' };
        this.controller = 'MsNavigationHorizontalNodeController as vm';
        this.compile = function (templateElement) {
            templateElement.addClass('os-navigation-horizontal-node');
            return function (scope, iElement, templateAttributes, MsNavigationHorizontalNodeCtrl) {
                // Add custom classes
                iElement.addClass(MsNavigationHorizontalNodeCtrl.getClass());
                // Add group class if it's a group
                if (MsNavigationHorizontalNodeCtrl.group) {
                    iElement.addClass('group');
                }
            };
        };
    }
    return NavigationHorizontalNodeDirective;
}());
exports.NavigationHorizontalNodeDirective = NavigationHorizontalNodeDirective;
/**
 * Navigation horizontal item directive
 */
var NavigationHorizontalItemDirective = (function () {
    function NavigationHorizontalItemDirective($mdMedia) {
        var _this = this;
        this.$mdMedia = $mdMedia;
        this.restrict = 'A';
        this.require = '^osNavigationHorizontalNode';
        this.compile = function (templateElement) {
            templateElement.addClass('os-navigation-horizontal-item');
            return function (scope, iElement, templateAttributes, MsNavigationHorizontalNodeCtrl) {
                var onClick = function () {
                    if (!MsNavigationHorizontalNodeCtrl.hasChildren || _this.$mdMedia('gt-md')) {
                        return;
                    }
                    iElement.toggleClass('expanded');
                };
                iElement.on('click', onClick);
                // Cleanup
                scope.$on('$destroy', function () {
                    iElement.off('click');
                });
            };
        };
    }
    NavigationHorizontalItemDirective.factory = function () {
        var directive = function ($mdMedia) { return new NavigationHorizontalItemDirective($mdMedia); };
        directive.$inject = ['$mdMedia'];
        return directive;
    };
    return NavigationHorizontalItemDirective;
}());
exports.NavigationHorizontalItemDirective = NavigationHorizontalItemDirective;
/**
 * Navigation horizontal node controller implementation
 */
var NavigationHorizontalNodeController = (function () {
    /**
     * Creates a new instance of the navigation horizontal node controller
     *
     * @param $scope                The scope
     * @param $element              The element service
     * @param $rootScope            The root scope
     * @param $state                The route state service
     * @param osNavigationService   The navigation service
     */
    function NavigationHorizontalNodeController($scope, $element, $rootScope, $state, osNavigationService) {
        var _this = this;
        this.$scope = $scope;
        this.$element = $element;
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.osNavigationService = osNavigationService;
        this.element = undefined;
        this.group = undefined;
        this.hasChildren = undefined;
        this.node = undefined;
        /**
         * Return the class
         *
         * @returns {*}
         */
        this.getClass = function () {
            return _this.node.class;
        };
        this.element = $element;
        this.node = $scope.node;
        this.init();
    }
    /**
     * Initialize
     */
    NavigationHorizontalNodeController.prototype.init = function () {
        // Setup the initial values
        var _this = this;
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
        this.$scope.$on('osNavigation::stateMatched', function () {
            // Mark as active if has children
            if (_this.hasChildren) {
                _this.$scope.$evalAsync(function () {
                    _this.isActive = true;
                });
            }
        });
        // Listen for clearActive event
        this.$scope.$on('osNavigation::clearActive', function () {
            if (!_this.hasChildren) {
                return;
            }
            var activePathParts = [];
            var activeItem = _this.osNavigationService.getActiveItem();
            if (activeItem) {
                activePathParts = activeItem.node._path.split('.');
            }
            // Test for active path
            if (activePathParts.indexOf(_this.node._id) > -1) {
                _this.$scope.$evalAsync(function () {
                    _this.isActive = true;
                });
            }
            else {
                _this.$scope.$evalAsync(function () {
                    _this.isActive = false;
                });
            }
        });
        // Listen for $stateChangeSuccess event
        this.$scope.$on('$stateChangeSuccess', function () {
            if (_this.node.state === _this.$state.current.name) {
                // If state params are defined, make sure they are
                // equal, otherwise do not set the active item
                if (angular.isDefined(_this.node.stateParams) &&
                    angular.isDefined(_this.$state.params) &&
                    !angular.equals(_this.node.stateParams, _this.$state.params)) {
                    return;
                }
                // Update active item on state change
                _this.osNavigationService.setActiveItem(_this.node, _this.$scope);
                // Clear all active states everything except the one we're using
                _this.$rootScope.$broadcast('osNavigation::clearActive');
            }
        });
    };
    return NavigationHorizontalNodeController;
}());
exports.NavigationHorizontalNodeController = NavigationHorizontalNodeController;
//# sourceMappingURL=horizontal.js.map