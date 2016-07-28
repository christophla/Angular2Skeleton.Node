/// <reference path="../index.module.ts" />
module Main {

    /**
     * Main Controller
     */
    class MainController {

        public static $inject = ['$scope', '$rootScope'];

        constructor(private $scope: ng.IScope, private $rootScope: ng.IRootScopeService) {

            // Remove the splash screen
            $scope.$on('$viewContentAnimationEnded', event => {
                if (event.targetScope.$id === $scope.$id) {
                    $rootScope.$broadcast('osSplashScreen::remove');
                }
            });
        }
    }

    /**
     * Module Registration
     */
    angular
        .module('app')
        .controller('MainController', MainController);

}
