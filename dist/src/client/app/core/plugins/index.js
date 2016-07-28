"use strict";
/**
 * Plugin configuration service implementation
 */
class PluginConfigurationService {
    /**
     * Creates a new instance of the plugin configuration service
     *
     * @param configurations
     */
    constructor(configurations) {
        this.configurations = configurations;
    }
    getPluginConfigurations() {
        return this.configurations;
    }
    findPluginConfiguration(id) {
        var index = this.configurations.map((x) => { return x.id; }).indexOf(id);
        return this.configurations[index];
    }
}
exports.PluginConfigurationService = PluginConfigurationService;
/**
 * Plugin configuration provider implementation
 */
class PluginConfigurationProvider {
    constructor() {
        this.configurations = [];
    }
    /**
     * Adds a plugin
     *
     * @param configuration The plugin configuration
     */
    addPlugin(configuration) {
        this.configurations.push(configuration);
    }
    /**
     * Service
     */
    $get() {
        return new PluginConfigurationService(this.configurations);
    }
}
exports.PluginConfigurationProvider = PluginConfigurationProvider;
//# sourceMappingURL=index.js.map