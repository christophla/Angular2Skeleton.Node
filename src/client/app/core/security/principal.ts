
export interface IIdentity {
    name: string;
    token: string;
    roles: string[];
}

export interface IPrincipal {
    config: IPrincipalConfiguration;
    authenticate(identity: IIdentity, rememberMe?: boolean): void;
    identity(force?: boolean): angular.IPromise<IIdentity>;
    isAuthenticated(): boolean;
    isIdentityResolved(): boolean;
    isInAnyRole(roles: string[]): boolean;
    isInRole(role: string): boolean;
}

export interface IPrincipalConfigurationStates {
    accessdenied: string;
    login: string;
}

export interface IPrincipalConfiguration {
    enableRememberMe?: boolean;
    requestTokenName?: string;
    requestTokenUseBearer?: boolean;
    states: IPrincipalConfigurationStates;
    storageKey?: string;
}

/**
 * Principal Configuration Provider
 */
export interface IPrincipalProvider extends ng.IServiceProvider {
    config(configuration: IPrincipalConfiguration);
}

export class Principal implements IPrincipal {

    public config: IPrincipalConfiguration;

    private authenticated = false;
    private currentIdentity: IIdentity = undefined;
    private rememberMe: boolean;


    /**
     * Creates a new instance of the principal service
     *
     * @param config        The principal configuration
     * @param $http         The http service
     * @param $q            The Q promise service
     * @param underscore    The underscore library service
     */
    constructor(
        config: IPrincipalConfiguration,
        private $http: ng.IHttpService,
        private $log: ng.ILogService,
        private $q: ng.IQService,
        private underscore: UnderscoreStatic
    ) {
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
    public authenticate(identity: IIdentity, rememberMe?: boolean): void {

        this.authenticated = identity != null;
        this.currentIdentity = identity;
        this.rememberMe = rememberMe;

        var storage = (rememberMe) ? localStorage : sessionStorage;

        if (identity) {
            storage.setItem(this.config.storageKey, angular.toJson(this.currentIdentity));
            var token = this.config.requestTokenUseBearer ? `bearer ${identity.token}` : identity.token;
            this.$http.defaults.headers.common[this.config.requestTokenName] = token;
        } else {
            storage.removeItem(this.config.storageKey);
            this.$http.defaults.headers.common[this.config.requestTokenName] = undefined;
        }

    }

    /**
     * Indicates if the current user has been authenticated
     */
    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    /**
     * Indicates if the identity has been resolved
     */
    public isIdentityResolved(): boolean {
        return angular.isDefined(this.currentIdentity);
    }

    /**
     * Indicates if the current user is in an of the given roles
     *
     * @param roles The roles to check
     */
    public isInAnyRole(roles: string[]): boolean {

        if (!this.authenticated || !this.currentIdentity.roles) { return false; }

        for (var i = 0; i < roles.length; i++) {
            if (this.isInRole(roles[i])) { return true; }
        }

        return false;
    }

    /**
     * Indicates if the current user is is a given role
     *
     * @param role  The role name
     */
    public isInRole(role: string): boolean {
        if (!this.authenticated || !this.currentIdentity.roles) { return false; }

        return this.underscore.indexOf(this.currentIdentity.roles, role) !== -1;
    }

    /**
     * Returns identity of the current user
     *
     * @param force Forces a lookup in the cache
     */
    public identity(force?: boolean): angular.IPromise<IIdentity> {

        var deferred = this.$q.defer();

        if (force) { this.currentIdentity = undefined; }

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
    }
}

export class PrincipalProvider implements IPrincipalProvider {

    private defaultConfig: IPrincipalConfiguration = {
        enableRememberMe: false,
        requestTokenName: 'Authorization',
        requestTokenUseBearer: false,
        states: {
            accessdenied: undefined,
            login: undefined
        },
        storageKey: 'principal.identity'
    };

    /**
    * Extend default configuration with the given one
    *
    * @param configuration The principal configuration settings
    */
    public config(configuration: IPrincipalConfiguration) {
        this.defaultConfig = angular.extend({}, this.defaultConfig, configuration);
    }

    /**
     * Service
     */
    public $get($http: ng.IHttpService, $log: ng.ILogService, $q: ng.IQService, underscore: UnderscoreStatic): IPrincipal {
        return new Principal(this.defaultConfig, $http, $log, $q, underscore);
    }
}
