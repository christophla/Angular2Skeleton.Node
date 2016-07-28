import 'angular';

/**
 * The home index controller
 */
export class IndexController {

    public static $inject = ['appTheming'];
    public themes;

    /**
     * Create a new index controller instance
     *
     * @param appTheming The app theming service
     */
    constructor(private appTheming: any) {
        console.log('Loading IndexController...');
        this.themes = appTheming.themes;
    }
}

/**
 * Main Controller
 */
export class MainController {

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
