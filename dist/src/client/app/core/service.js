"use strict";
/**
 * Core service facade implementation
 */
class CoreService {
    /**
     * Creates a new instance of the core service facade
     *
     * @param logging       The logging service
     * @param navigation    The nvigation service
     * @param plugins       The plugin configuration service
     */
    constructor(logging, navigation, plugins) {
        this.logging = logging;
        this.navigation = navigation;
        this.plugins = plugins;
    }
}
CoreService.$inject = [
    'osLoggingService',
    'osNavigationService',
    'osPluginsConfig'
];
exports.CoreService = CoreService;
//# sourceMappingURL=service.js.map