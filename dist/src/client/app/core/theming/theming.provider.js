/// <reference path="../core.module.ts" />
var Core;
(function (Core) {
    /**
     * Application theming service implementation
     */
    class AppThemingService {
        /**
         * Create a new app theming service instance
         *
         * @param registeredPallettes   The registered pallettes
         * @param registeredThemes      The registered themes
         * @param $cookies              The cookies service
         * @param $log                  The log service
         */
        constructor(registeredPallettes, registeredThemes, $cookies, $log) {
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
        getRegisteredPalettes() {
            return this.registeredPallettes;
        }
        /**
         * Get registered themes
         *
         * @returns {*}
         */
        getRegisteredThemes() {
            return this.registeredThemes;
        }
        /**
         * Set active theme
         *
         * @param themeName The name of the active theme
         */
        setActiveTheme(themeName) {
            // If theme does not exist, fallback to the default theme
            if (angular.isUndefined(this.themes.list[themeName])) {
                // If there is no theme called "default"...
                if (angular.isUndefined(this.themes.list.default)) {
                    this.$log.error('You must have at least one theme named "default"');
                    return;
                }
                this.$log.warn(`The theme "${themeName}" does not exist! Falling back to the "default" theme.`);
                // Otherwise set theme to default theme
                this.themes.active.name = 'default';
                this.themes.active.theme = this.themes.list.default;
                this.$cookies.put('selectedTheme', this.themes.active.name);
                return;
            }
            this.themes.active.name = themeName;
            this.themes.active.theme = this.themes.list[themeName];
            this.$cookies.put('selectedTheme', themeName);
        }
        /**
         * Set available themes list
         *
         * @param themeList The available themes
         */
        setThemesList(themeList) {
            this.themes.list = themeList;
        }
    }
    Core.AppThemingService = AppThemingService;
    /**
     * Application theming provider implementation
     */
    class AppThemingProvider {
        /**
        * Set registered palettes
        *
        * @param _registeredPalettes
        */
        setRegisteredPalettes(_registeredPalettes) {
            this.registeredPallettes = _registeredPalettes;
        }
        /**
         * Set registered themes
         *
         * @param _registeredThemes
         */
        setRegisteredThemes(_registeredThemes) {
            this.registeredThemes = _registeredThemes;
        }
        /**
         * Returns an instance of the [IAppThemingService]
         */
        $get($log, $cookies) {
            return new AppThemingService(this.registeredPallettes, this.registeredThemes, $cookies, $log);
        }
    }
    Core.AppThemingProvider = AppThemingProvider;
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .provider('appTheming', Core.AppThemingProvider);
})(Core || (Core = {}));
//# sourceMappingURL=theming.provider.js.map