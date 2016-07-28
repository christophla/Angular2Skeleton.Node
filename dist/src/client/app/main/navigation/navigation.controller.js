/// <reference path="navigation.module.ts" />
var Navigation;
(function (Navigation) {
    /**
     * Navigation Controller
     */
    class NavigationController {
        constructor($scope) {
            this.$scope = $scope;
            this.bodyEl = angular.element('body');
            this.folded = false;
            this.osScrollOptions = {
                suppressScrollX: true
            };
            // Close the mobile menu on $stateChangeSuccess
            $scope.$on('$stateChangeSuccess', () => {
                this.bodyEl.removeClass('os-navigation-horizontal-mobile-menu-active');
            });
        }
        /**
         * Toggle folded status
         */
        toggleMsNavigationFolded() {
            this.folded = !this.folded;
        }
    }
    NavigationController.$inject = ['$scope'];
    /**
     * Module Registration
     */
    angular
        .module('app.navigation')
        .controller('NavigationController', NavigationController);
})(Navigation || (Navigation = {}));
//# sourceMappingURL=navigation.controller.js.map