"use strict";
/**
 * OS Configuration Service
 */
class OSConfigurationService {
    /**
     * Constructor
     * @param osConfiguration The configuration settings
     */
    constructor(osConfiguration) {
        this.osConfiguration = osConfiguration;
    }
    /**
     * Returns a config value
     * @param configName The configuration element name
     */
    getConfig(configName) {
        if (angular.isUndefined(this.osConfiguration[configName])) {
            return false;
        }
        return this.osConfiguration[configName];
    }
    /**
    * Creates or updates config object
    *
    * @param configName     The configuration element name
    * @param configValue    The configuration element value
    */
    setConfig(configName, configValue) {
        this.osConfiguration[configName] = configValue;
    }
}
OSConfigurationService.$inject = ['osConfiguration'];
exports.OSConfigurationService = OSConfigurationService;
/**
 * OS Configuration Provider
 */
class OSConfigurationServiceProvider {
    constructor() {
        // Default Configuration
        this.osConfiguration = {
            disableCustomScrollbars: false,
            disableCustomScrollbarsOnMobile: true,
            disableMdInkRippleOnMobile: true,
            pluginDirectory: 'app/plugins'
        };
    }
    /**
     * Extend default configuration with the given one
     *
     * @param configuration The application configuration settings
     */
    config(configuration) {
        this.osConfiguration = angular.extend({}, this.osConfiguration, configuration);
    }
    /**
     * Service
     */
    $get() {
        return new OSConfigurationService(this.osConfiguration);
    }
}
exports.OSConfigurationServiceProvider = OSConfigurationServiceProvider;
//# sourceMappingURL=index.js.map