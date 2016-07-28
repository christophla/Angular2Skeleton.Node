/// <reference path="navigation.module.ts" />


module Navigation {


    /**
     * Navigation Controller
     */
    class NavigationController {

        public static $inject = ['$scope'];

        constructor(private $scope: any) {

            // Close the mobile menu on $stateChangeSuccess
            $scope.$on('$stateChangeSuccess', () => {
                this.bodyEl.removeClass('os-navigation-horizontal-mobile-menu-active');
            });
        }

        public bodyEl = angular.element('body');
        public folded = false;
        public osScrollOptions = {
            suppressScrollX: true
        };

        /**
         * Toggle folded status
         */
        public toggleMsNavigationFolded() {
            this.folded = !this.folded;
        }
    }

    /**
     * Module Registration
     */
    angular
        .module('app.navigation')
        .controller('NavigationController', NavigationController);

}
