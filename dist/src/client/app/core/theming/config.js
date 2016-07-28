"use strict";
var ThemeConfig = (function () {
    function ThemeConfig($mdThemingProvider, appPalettes, appThemes, appThemingProvider) {
        // Inject Cookies Service
        var $cookies;
        angular.injector(['ngCookies']).invoke([
            '$cookies', function (cookies) {
                $cookies = cookies;
            }
        ]);
        // Check if custom theme exist in cookies
        var customTheme = $cookies.getObject('customTheme');
        if (customTheme) {
            appThemes['custom'] = customTheme;
        }
        $mdThemingProvider.alwaysWatchTheme(true);
        // Define custom palettes
        angular.forEach(appPalettes, function (palette) {
            $mdThemingProvider.definePalette(palette.name, palette.options);
        });
        // Register custom themes
        angular.forEach(appThemes, function (theme, themeName) {
            $mdThemingProvider.theme(themeName)
                .primaryPalette(theme.primary.name, theme.primary.hues)
                .accentPalette(theme.accent.name, theme.accent.hues)
                .warnPalette(theme.warn.name, theme.warn.hues)
                .backgroundPalette(theme.background.name, theme.background.hues);
        });
        // Store generated PALETTES and THEMES objects from $mdThemingProvider
        // in our custom provider, so we can inject them into other areas
        appThemingProvider.setRegisteredPalettes($mdThemingProvider._PALETTES);
        appThemingProvider.setRegisteredThemes($mdThemingProvider._THEMES);
    }
    ThemeConfig.$inject = [
        '$mdThemingProvider',
        'appPalettes',
        'appThemes',
        'appThemingProvider'
    ];
    return ThemeConfig;
}());
exports.ThemeConfig = ThemeConfig;
//# sourceMappingURL=config.js.map