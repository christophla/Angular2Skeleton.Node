"use strict";
/**
 * Core service facade implementation
 */
var CoreService = (function () {
    /**
     * Creates a new instance of the core service facade
     *
     * @param logging       The logging service
     * @param navigation    The nvigation service
     * @param plugins       The plugin configuration service
     */
    function CoreService(logging, navigation, plugins) {
        this.logging = logging;
        this.navigation = navigation;
        this.plugins = plugins;
    }
    CoreService.$inject = [
        'osLoggingService',
        'osNavigationService',
        'osPluginsConfig'
    ];
    return CoreService;
}());
exports.CoreService = CoreService;
//# sourceMappingURL=service.js.map