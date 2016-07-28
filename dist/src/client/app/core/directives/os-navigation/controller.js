"use strict";
/**
 * Navigation controller
 */
var NavigationController = (function () {
    /**
     * Creates a new navigation controller instance
     *
     * @param $scope                The scope
     * @param osNavigationService   The navigation service
     */
    function NavigationController($scope, osNavigationService) {
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
    NavigationController.prototype.toggleHorizontalMobileMenu = function () {
        angular.element('body').toggleClass('os-navigation-horizontal-mobile-menu-active');
    };
    NavigationController.$inject = ['$scope', 'osNavigationService'];
    return NavigationController;
}());
exports.NavigationController = NavigationController;
//# sourceMappingURL=controller.js.map