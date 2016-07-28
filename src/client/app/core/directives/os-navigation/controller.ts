
import {INavigationService} from './service';

/**
 * Navigation controller
 */
export class NavigationController {

    public static $inject = ['$scope', 'osNavigationService'];

    private navigation: any;

    /**
     * Creates a new navigation controller instance
     *
     * @param $scope                The scope
     * @param osNavigationService   The navigation service
     */
    constructor(private $scope: ng.IScope, private osNavigationService: INavigationService) {

        // get navigation object
        if ($scope.$root) {
            this.navigation = osNavigationService.getNavigationObject($scope.$root);
        } else {
            this.navigation = osNavigationService.getNavigationObject();
        }

        // Sort the navigation before doing anything else
        osNavigationService.sort();
    }

    /**
     * Toggle horizontal mobile menu
     */
    public toggleHorizontalMobileMenu() {
        angular.element('body').toggleClass('os-navigation-horizontal-mobile-menu-active');
    }
}
