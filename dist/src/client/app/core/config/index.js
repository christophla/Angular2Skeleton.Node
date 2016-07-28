"use strict";
/**
 * OS Configuration Service
 */
var OSConfigurationService = (function () {
    /**
     * Constructor
     * @param osConfiguration The configuration settings
     */
    function OSConfigurationService(osConfiguration) {
        this.osConfiguration = osConfiguration;
    }
    /**
     * Returns a config value
     * @param configName The configuration element name
     */
    OSConfigurationService.prototype.getConfig = function (configName) {
        if (angular.isUndefined(this.osConfiguration[configName])) {
            return false;
        }
        return this.osConfiguration[configName];
    };
    /**
    * Creates or updates config object
    *
    * @param configName     The configuration element name
    * @param configValue    The configuration element value
    */
    OSConfigurationService.prototype.setConfig = function (configName, configValue) {
        this.osConfiguration[configName] = configValue;
    };
    OSConfigurationService.$inject = ['osConfiguration'];
    return OSConfigurationService;
}());
exports.OSConfigurationService = OSConfigurationService;
/**
 * OS Configuration Provider
 */
var OSConfigurationServiceProvider = (function () {
    function OSConfigurationServiceProvider() {
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
    OSConfigurationServiceProvider.prototype.config = function (configuration) {
        this.osConfiguration = angular.extend({}, this.osConfiguration, configuration);
    };
    /**
     * Service
     */
    OSConfigurationServiceProvider.prototype.$get = function () {
        return new OSConfigurationService(this.osConfiguration);
    };
    return OSConfigurationServiceProvider;
}());
exports.OSConfigurationServiceProvider = OSConfigurationServiceProvider;
//# sourceMappingURL=index.js.map