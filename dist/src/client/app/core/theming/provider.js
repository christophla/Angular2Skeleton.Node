"use strict";
/**
 * Application theming service implementation
 */
var AppThemingService = (function () {
    /**
     * Create a new app theming service instance
     *
     * @param registeredPallettes   The registered pallettes
     * @param registeredThemes      The registered themes
     * @param $cookies              The cookies service
     * @param $log                  The log service
     */
    function AppThemingService(registeredPallettes, registeredThemes, $cookies, $log) {
        this.registeredPallettes = registeredPallettes;
        this.registeredThemes = registeredThemes;
        this.$cookies = $cookies;
        this.$log = $log;
        // default themes
        this.themes = {
            active: {
                'name': '',
                'theme': {}
            },
            list: {
                default: false
            }
        };
    }
    /**
    * Get registered palettes
    *
    * @returns {*}
    */
    AppThemingService.prototype.getRegisteredPalettes = function () {
        return this.registeredPallettes;
    };
    /**
     * Get registered themes
     *
     * @returns {*}
     */
    AppThemingService.prototype.getRegisteredThemes = function () {
        return this.registeredThemes;
    };
    /**
     * Set active theme
     *
     * @param themeName The name of the active theme
     */
    AppThemingService.prototype.setActiveTheme = function (themeName) {
        // If theme does not exist, fallback to the default theme
        if (angular.isUndefined(this.themes.list[themeName])) {
            // If there is no theme called "default"...
            if (angular.isUndefined(this.themes.list.default)) {
                this.$log.error('You must have at least one theme named "default"');
                return;
            }
            this.$log.warn("The theme \"" + themeName + "\" does not exist! Falling back to the \"default\" theme.");
            // Otherwise set theme to default theme
            this.themes.active.name = 'default';
            this.themes.active.theme = this.themes.list.default;
            this.$cookies.put('selectedTheme', this.themes.active.name);
            return;
        }
        this.themes.active.name = themeName;
        this.themes.active.theme = this.themes.list[themeName];
        this.$cookies.put('selectedTheme', themeName);
    };
    /**
     * Set available themes list
     *
     * @param themeList The available themes
     */
    AppThemingService.prototype.setThemesList = function (themeList) {
        this.themes.list = themeList;
    };
    return AppThemingService;
}());
exports.AppThemingService = AppThemingService;
/**
 * Application theming provider implementation
 */
var AppThemingProvider = (function () {
    function AppThemingProvider() {
    }
    /**
    * Set registered palettes
    *
    * @param _registeredPalettes
    */
    AppThemingProvider.prototype.setRegisteredPalettes = function (_registeredPalettes) {
        this.registeredPallettes = _registeredPalettes;
    };
    /**
     * Set registered themes
     *
     * @param _registeredThemes
     */
    AppThemingProvider.prototype.setRegisteredThemes = function (_registeredThemes) {
        this.registeredThemes = _registeredThemes;
    };
    /**
     * Returns an instance of the [IAppThemingService]
     */
    AppThemingProvider.prototype.$get = function ($log, $cookies) {
        return new AppThemingService(this.registeredPallettes, this.registeredThemes, $cookies, $log);
    };
    return AppThemingProvider;
}());
exports.AppThemingProvider = AppThemingProvider;
//# sourceMappingURL=provider.js.map