/// <reference path="../core.module.ts" />
/// <reference path="../services/underscore.ts" />
var Core;
(function (Core) {
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
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .provider('osProfile', ProfileProvider);
})(Core || (Core = {}));
//# sourceMappingURL=profile.provider.js.map