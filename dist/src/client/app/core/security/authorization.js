"use strict";
/**
 * Authorization Service implementation
 */
var AuthorizationService = (function () {
    function AuthorizationService($rootScope, $http, $state, $log, osPrincipal) {
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$state = $state;
        this.$log = $log;
        this.osPrincipal = osPrincipal;
    }
    AuthorizationService.prototype.authorize = function () {
        var _this = this;
        this.$log.debug('Authorizing...');
        return this.osPrincipal.identity().then(function () {
            var isAuthenticated = _this.osPrincipal.isAuthenticated();
            if (_this.$rootScope.toState.data &&
                _this.$rootScope.toState.data.roles &&
                _this.$rootScope.toState.data.roles.length > 0 &&
                !_this.osPrincipal.isInAnyRole(_this.$rootScope.toState.data.roles)) {
                if (isAuthenticated) {
                    _this.$log.debug("Not authorized for desired state: " + _this.$rootScope.toState);
                    // user is signed in but not authorized for desired state
                    _this.$state.go(_this.osPrincipal.config.states.accessdenied);
                }
                else {
                    _this.$log.debug('User is not authenticated');
                    // User is not authenticated. Stow the state they wanted before you
                    // send them to the signin state, so you can return them when you're done
                    _this.$rootScope.returnToState = _this.$rootScope.toState;
                    _this.$rootScope.returnToStateParams = _this.$rootScope.toStateParams;
                    // Send them to the signin state so they can log in
                    _this.$log.debug('Redirecting to log-on');
                    _this.$state.go(_this.osPrincipal.config.states.login);
                }
            }
        });
    };
    AuthorizationService.$inject = ['$rootScope', '$http', '$state', '$log', 'osPrincipal'];
    return AuthorizationService;
}());
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorization.js.map