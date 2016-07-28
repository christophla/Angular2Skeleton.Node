"use strict";
var ProfileService = (function () {
    /**
     * Creates a new instance of the profile service
     *
     * @param config        The principal configuration
     * @param storage       The storage service
     */
    function ProfileService(config, storage) {
        this.storage = storage;
        this.updateEventName = 'event: profile-updated';
        this.config = config;
    }
    /**
     * Sets the profile
     *
     * @param profile       The profile
     */
    ProfileService.prototype.set = function (profile) {
        this.storage.set(this.config.storageKey, profile);
    };
    /**
     * Returns the profile
     *
     */
    ProfileService.prototype.get = function () {
        return this.storage.get(this.config.storageKey);
    };
    ProfileService.$inject = ['config', 'localStorageService'];
    return ProfileService;
}());
exports.ProfileService = ProfileService;
var ProfileProvider = (function () {
    function ProfileProvider() {
        this.defaultConfig = {
            storageKey: 'principal.identity'
        };
    }
    /**
    * Extend default configuration with the given one
    *
    * @param configuration The profile configuration settings
    */
    ProfileProvider.prototype.config = function (configuration) {
        this.defaultConfig = angular.extend({}, this.defaultConfig, configuration);
    };
    /**
     * Service
     */
    ProfileProvider.prototype.$get = function (localStorageService) {
        return new ProfileService(this.defaultConfig, localStorageService); // TODO: inject storage by name for minification
    };
    ;
    return ProfileProvider;
}());
exports.ProfileProvider = ProfileProvider;
//# sourceMappingURL=index.js.map