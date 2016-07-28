"use strict";
var Principal = (function () {
    /**
     * Creates a new instance of the principal service
     *
     * @param config        The principal configuration
     * @param $http         The http service
     * @param $q            The Q promise service
     * @param underscore    The underscore library service
     */
    function Principal(config, $http, $log, $q, underscore) {
        this.$http = $http;
        this.$log = $log;
        this.$q = $q;
        this.underscore = underscore;
        this.authenticated = false;
        this.currentIdentity = undefined;
        this.config = config;
        if (this.config.states.accessdenied === undefined) {
            $log.error('You must define the principal provider accessdenied state');
        }
        if (this.config.states.login === undefined) {
            $log.error('You must define the principal provider login state');
        }
    }
    /**
     * Authenticates a user
     *
     * @param identity      The user identity
     * @param rememberMe    Indicates if identity persists between session (local storage)
     */
    Principal.prototype.authenticate = function (identity, rememberMe) {
        this.authenticated = identity != null;
        this.currentIdentity = identity;
        this.rememberMe = rememberMe;
        var storage = (rememberMe) ? localStorage : sessionStorage;
        if (identity) {
            storage.setItem(this.config.storageKey, angular.toJson(this.currentIdentity));
            var token = this.config.requestTokenUseBearer ? "bearer " + identity.token : identity.token;
            this.$http.defaults.headers.common[this.config.requestTokenName] = token;
        }
        else {
            storage.removeItem(this.config.storageKey);
            this.$http.defaults.headers.common[this.config.requestTokenName] = undefined;
        }
    };
    /**
     * Indicates if the current user has been authenticated
     */
    Principal.prototype.isAuthenticated = function () {
        return this.authenticated;
    };
    /**
     * Indicates if the identity has been resolved
     */
    Principal.prototype.isIdentityResolved = function () {
        return angular.isDefined(this.currentIdentity);
    };
    /**
     * Indicates if the current user is in an of the given roles
     *
     * @param roles The roles to check
     */
    Principal.prototype.isInAnyRole = function (roles) {
        if (!this.authenticated || !this.currentIdentity.roles) {
            return false;
        }
        for (var i = 0; i < roles.length; i++) {
            if (this.isInRole(roles[i])) {
                return true;
            }
        }
        return false;
    };
    /**
     * Indicates if the current user is is a given role
     *
     * @param role  The role name
     */
    Principal.prototype.isInRole = function (role) {
        if (!this.authenticated || !this.currentIdentity.roles) {
            return false;
        }
        return this.underscore.indexOf(this.currentIdentity.roles, role) !== -1;
    };
    /**
     * Returns identity of the current user
     *
     * @param force Forces a lookup in the cache
     */
    Principal.prototype.identity = function (force) {
        var deferred = this.$q.defer();
        if (force) {
            this.currentIdentity = undefined;
        }
        // check and see if we have retrieved the identity data from the server.
        // If we have, reuse it by immediately resolving
        if (angular.isDefined(this.currentIdentity)) {
            deferred.resolve(this.currentIdentity);
            return deferred.promise;
        }
        // retrieve identity from storage
        this.currentIdentity = (localStorage.getItem(this.config.storageKey) != null) ?
            angular.fromJson(localStorage.getItem(this.config.storageKey)) :
            angular.fromJson(sessionStorage.getItem(this.config.storageKey));
        this.authenticate(this.currentIdentity, this.rememberMe);
        deferred.resolve(this.currentIdentity);
        return deferred.promise;
    };
    return Principal;
}());
exports.Principal = Principal;
var PrincipalProvider = (function () {
    function PrincipalProvider() {
        this.defaultConfig = {
            enableRememberMe: false,
            requestTokenName: 'Authorization',
            requestTokenUseBearer: false,
            states: {
                accessdenied: undefined,
                login: undefined
            },
            storageKey: 'principal.identity'
        };
    }
    /**
    * Extend default configuration with the given one
    *
    * @param configuration The principal configuration settings
    */
    PrincipalProvider.prototype.config = function (configuration) {
        this.defaultConfig = angular.extend({}, this.defaultConfig, configuration);
    };
    /**
     * Service
     */
    PrincipalProvider.prototype.$get = function ($http, $log, $q, underscore) {
        return new Principal(this.defaultConfig, $http, $log, $q, underscore);
    };
    return PrincipalProvider;
}());
exports.PrincipalProvider = PrincipalProvider;
//# sourceMappingURL=principal.js.map