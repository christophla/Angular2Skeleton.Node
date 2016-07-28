
import * as Security from '../security';

export interface IProfile<T> {
    get(): T;
    set(): T;
}

export interface IProfileConfiguration {
    storageKey?: string;
}

/**
 * Profile Configuration Provider
 */
export interface IProfileService<T> {
    updateEventName: string;
    get(): T;
    set(profile: T): void;
}

export interface IProfileProvider extends ng.IServiceProvider {
    config(configuration: IProfileConfiguration);
}

export class ProfileService<T> implements IProfileService<T> {

    public static $inject = ['config', 'localStorageService'];

    public updateEventName = 'event: profile-updated';
    public config: IProfileConfiguration;

    private profile: T;

    /**
     * Creates a new instance of the profile service
     *
     * @param config        The principal configuration
     * @param storage       The storage service
     */
    constructor(
        config: IProfileConfiguration,
        private storage: angular.local.storage.ILocalStorageService
    ) {
        this.config = config;
    }

    /**
     * Sets the profile
     *
     * @param profile       The profile
     */
    public set(profile: T): void {
        this.storage.set(this.config.storageKey, profile);
    }

    /**
     * Returns the profile
     *
     */
    public get(): T {
        return <T>this.storage.get(this.config.storageKey);
    }

}

export class ProfileProvider implements IProfileProvider {

    private defaultConfig: IProfileConfiguration = {
        storageKey: 'principal.identity'
    };

    /**
    * Extend default configuration with the given one
    *
    * @param configuration The profile configuration settings
    */
    public config(configuration: Security.IPrincipalConfiguration) {
        this.defaultConfig = angular.extend({}, this.defaultConfig, configuration);
    }

    /**
     * Service
     */
    public $get(localStorageService: angular.local.storage.ILocalStorageService): IProfileService<any> {
        return new ProfileService<any>(this.defaultConfig, localStorageService); // TODO: inject storage by name for minification
    };

}

