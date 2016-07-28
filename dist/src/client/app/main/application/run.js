"use strict";
require('angular');
/**
 * Runs the application
 *
 * @param $rootScope
 * @param $timeout
 * @param $state
 * @param osAuthorizationService
 */
var RunBlock = (function () {
    function RunBlock($rootScope, $timeout, $state, osAuthorizationService, osPrincipal) {
        console.log('Loading index run block...');
        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function () {
            $rootScope.loadingProgress = true;
        });
        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function () {
            $timeout(function () {
                $rootScope.loadingProgress = false;
            });
        });
        // Authorize state
        var stateAuthorizeStartEvent = $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            // if (osPrincipal.isIdentityResolved()) {
            //     osAuthorizationService.authorize();
            // }
        });
        // Store state in the root scope for easy access
        $rootScope.state = $state;
        // Cleanup
        $rootScope.$on('$destroy', function () {
            stateAuthorizeStartEvent();
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }
    RunBlock.$inject = ['$rootScope', '$timeout', '$state', 'osAuthorizationService', 'osPrincipal'];
    return RunBlock;
}());
exports.RunBlock = RunBlock;
//# sourceMappingURL=run.js.map