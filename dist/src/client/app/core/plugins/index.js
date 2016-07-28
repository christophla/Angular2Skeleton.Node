"use strict";
/**
 * Plugin configuration service implementation
 */
var PluginConfigurationService = (function () {
    /**
     * Creates a new instance of the plugin configuration service
     *
     * @param configurations
     */
    function PluginConfigurationService(configurations) {
        this.configurations = configurations;
    }
    PluginConfigurationService.prototype.getPluginConfigurations = function () {
        return this.configurations;
    };
    PluginConfigurationService.prototype.findPluginConfiguration = function (id) {
        var index = this.configurations.map(function (x) { return x.id; }).indexOf(id);
        return this.configurations[index];
    };
    return PluginConfigurationService;
}());
exports.PluginConfigurationService = PluginConfigurationService;
/**
 * Plugin configuration provider implementation
 */
var PluginConfigurationProvider = (function () {
    function PluginConfigurationProvider() {
        this.configurations = [];
    }
    /**
     * Adds a plugin
     *
     * @param configuration The plugin configuration
     */
    PluginConfigurationProvider.prototype.addPlugin = function (configuration) {
        this.configurations.push(configuration);
    };
    /**
     * Service
     */
    PluginConfigurationProvider.prototype.$get = function () {
        return new PluginConfigurationService(this.configurations);
    };
    return PluginConfigurationProvider;
}());
exports.PluginConfigurationProvider = PluginConfigurationProvider;
//# sourceMappingURL=index.js.map