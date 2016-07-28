/// <reference path="../core.module.ts" />
var Core;
(function (Core) {
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
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .provider('osPluginsConfig', PluginConfigurationProvider);
})(Core || (Core = {}));
//# sourceMappingURL=plugins.provider.js.map