/// <reference path="../core.module.ts" />
var Core;
(function (Core) {
    /**
     * Authorization Service implementation
     */
    class AuthorizationService {
        constructor($rootScope, $http, $state, $log, osPrincipal) {
            this.$rootScope = $rootScope;
            this.$http = $http;
            this.$state = $state;
            this.$log = $log;
            this.osPrincipal = osPrincipal;
        }
        authorize() {
            this.$log.debug('Authorizing...');
            return this.osPrincipal.identity().then(() => {
                var isAuthenticated = this.osPrincipal.isAuthenticated();
                if (this.$rootScope.toState.data &&
                    this.$rootScope.toState.data.roles &&
                    this.$rootScope.toState.data.roles.length > 0 &&
                    !this.osPrincipal.isInAnyRole(this.$rootScope.toState.data.roles)) {
                    if (isAuthenticated) {
                        this.$log.debug(`Not authorized for desired state: ${this.$rootScope.toState}`);
                        // user is signed in but not authorized for desired state
                        this.$state.go(this.osPrincipal.config.states.accessdenied);
                    }
                    else {
                        this.$log.debug('User is not authenticated');
                        // User is not authenticated. Stow the state they wanted before you
                        // send them to the signin state, so you can return them when you're done
                        this.$rootScope.returnToState = this.$rootScope.toState;
                        this.$rootScope.returnToStateParams = this.$rootScope.toStateParams;
                        // Send them to the signin state so they can log in
                        this.$log.debug('Redirecting to log-on');
                        this.$state.go(this.osPrincipal.config.states.login);
                    }
                }
            });
        }
    }
    AuthorizationService.$inject = ['$rootScope', '$http', '$state', '$log', 'osPrincipal'];
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .service('osAuthorizationService', AuthorizationService);
})(Core || (Core = {}));
//# sourceMappingURL=authorization.service.js.map