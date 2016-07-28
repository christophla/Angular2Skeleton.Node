/// <reference path="navigation.module.ts" />
var Navigation;
(function (Navigation) {
    /**
     * Navigation Controller
     */
    var NavigationController = (function () {
        function NavigationController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.bodyEl = angular.element('body');
            this.folded = false;
            this.osScrollOptions = {
                suppressScrollX: true
            };
            // Close the mobile menu on $stateChangeSuccess
            $scope.$on('$stateChangeSuccess', function () {
                _this.bodyEl.removeClass('os-navigation-horizontal-mobile-menu-active');
            });
        }
        /**
         * Toggle folded status
         */
        NavigationController.prototype.toggleMsNavigationFolded = function () {
            this.folded = !this.folded;
        };
        NavigationController.$inject = ['$scope'];
        return NavigationController;
    }());
    /**
     * Module Registration
     */
    angular
        .module('app.navigation')
        .controller('NavigationController', NavigationController);
})(Navigation || (Navigation = {}));
//# sourceMappingURL=navigation.controller.js.map