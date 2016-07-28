/// <reference path="../../core.module.ts" />
var Core;
(function (Core) {
    /**
     * Navigation controller
     */
    class NavigationController {
        /**
         * Creates a new navigation controller instance
         *
         * @param $scope                The scope
         * @param osNavigationService   The navigation service
         */
        constructor($scope, osNavigationService) {
            this.$scope = $scope;
            this.osNavigationService = osNavigationService;
            // get navigation object
            if ($scope.$root) {
                this.navigation = osNavigationService.getNavigationObject($scope.$root);
            }
            else {
                this.navigation = osNavigationService.getNavigationObject();
            }
            // Sort the navigation before doing anything else
            osNavigationService.sort();
        }
        /**
         * Toggle horizontal mobile menu
         */
        toggleHorizontalMobileMenu() {
            angular.element('body').toggleClass('os-navigation-horizontal-mobile-menu-active');
        }
    }
    NavigationController.$inject = ['$scope', 'osNavigationService'];
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .controller('OsNavigationController', NavigationController);
})(Core || (Core = {}));
//# sourceMappingURL=os-navigation.controller.js.map