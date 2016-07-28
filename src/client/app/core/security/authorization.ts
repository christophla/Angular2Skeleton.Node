﻿
import {IPrincipal} from './principal';

/**
 * Authorization Service
 */
export interface IAuthorizationService {
    authorize: any;
}


/**
 * Authorization Service implementation
 */
export class AuthorizationService {

    public static $inject = ['$rootScope', '$http', '$state', '$log', 'osPrincipal'];

    constructor(
        private $rootScope: any,
        private $http: ng.IHttpProvider,
        private $state: ng.ui.IStateService,
        private $log: ng.ILogService,
        private osPrincipal: IPrincipal
    ) {
    }

    public authorize() {

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
                } else {

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