/// <reference path="../index.module.ts" />
var Main;
(function (Main) {
    /**
     * Main Controller
     */
    class MainController {
        constructor($scope, $rootScope) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            // Remove the splash screen
            $scope.$on('$viewContentAnimationEnded', event => {
                if (event.targetScope.$id === $scope.$id) {
                    $rootScope.$broadcast('osSplashScreen::remove');
                }
            });
        }
    }
    MainController.$inject = ['$scope', '$rootScope'];
    /**
     * Module Registration
     */
    angular
        .module('app')
        .controller('MainController', MainController);
})(Main || (Main = {}));
//# sourceMappingURL=main.controller.js.map