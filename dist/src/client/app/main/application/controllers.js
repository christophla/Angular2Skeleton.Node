"use strict";
require('angular');
/**
 * The home index controller
 */
var IndexController = (function () {
    /**
     * Create a new index controller instance
     *
     * @param appTheming The app theming service
     */
    function IndexController(appTheming) {
        this.appTheming = appTheming;
        console.log('Loading IndexController...');
        this.themes = appTheming.themes;
    }
    IndexController.$inject = ['appTheming'];
    return IndexController;
}());
exports.IndexController = IndexController;
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
exports.MainController = MainController;
//# sourceMappingURL=controllers.js.map