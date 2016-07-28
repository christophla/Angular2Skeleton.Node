"use strict";
class ProfileService {
    /**
     * Creates a new instance of the profile service
     *
     * @param config        The principal configuration
     * @param storage       The storage service
     */
    constructor(config, storage) {
        this.storage = storage;
        this.updateEventName = 'event: profile-updated';
        this.config = config;
    }
    /**
     * Sets the profile
     *
     * @param profile       The profile
     */
    set(profile) {
        this.storage.set(this.config.storageKey, profile);
    }
    /**
     * Returns the profile
     *
     */
    get() {
        return this.storage.get(this.config.storageKey);
    }
}
ProfileService.$inject = ['config', 'localStorageService'];
exports.ProfileService = ProfileService;
class ProfileProvider {
    constructor() {
        this.defaultConfig = {
            storageKey: 'principal.identity'
        };
    }
    /**
    * Extend default configuration with the given one
    *
    * @param configuration The profile configuration settings
    */
    config(configuration) {
        this.defaultConfig = angular.extend({}, this.defaultConfig, configuration);
    }
    /**
     * Service
     */
    $get(localStorageService) {
        return new ProfileService(this.defaultConfig, localStorageService); // TODO: inject storage by name for minification
    }
    ;
}
exports.ProfileProvider = ProfileProvider;
//# sourceMappingURL=index.js.map