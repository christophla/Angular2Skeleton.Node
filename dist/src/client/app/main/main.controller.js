/// <reference path="../index.module.ts" />
var Main;
(function (Main) {
    /**
     * Main Controller
     */
    var MainController = (function () {
        function MainController($scope, $rootScope) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            // Remove the splash screen
            $scope.$on('$viewContentAnimationEnded', function (event) {
                if (event.targetScope.$id === $scope.$id) {
                    $rootScope.$broadcast('osSplashScreen::remove');
                }
            });
        }
        MainController.$inject = ['$scope', '$rootScope'];
        return MainController;
    }());
    /**
     * Module Registration
     */
    angular
        .module('app')
        .controller('MainController', MainController);
})(Main || (Main = {}));
//# sourceMappingURL=main.controller.js.map