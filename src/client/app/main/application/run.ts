import 'angular';

/**
 * Runs the application
 *
 * @param $rootScope
 * @param $timeout
 * @param $state
 * @param osAuthorizationService
 */
export class RunBlock {

    public static $inject = ['$rootScope', '$timeout', '$state', 'osAuthorizationService', 'osPrincipal'];

    constructor(
        $rootScope: any,
        $timeout: ng.ITimeoutService,
        $state: ng.ui.IStateProvider,
        osAuthorizationService: Core.IAuthorizationService,
        osPrincipal: Core.IPrincipal
    ) {

        console.log('Loading index run block...');

        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', () => {
            $rootScope.loadingProgress = true;
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', () => {
            $timeout(() => {
                $rootScope.loadingProgress = false;
            });
        });

        // Authorize state
        var stateAuthorizeStartEvent = $rootScope.$on('$stateChangeStart', (event, toState, toStateParams) => {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            // if (osPrincipal.isIdentityResolved()) {
            //     osAuthorizationService.authorize();
            // }
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', () => {
            stateAuthorizeStartEvent();
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });

    }
}