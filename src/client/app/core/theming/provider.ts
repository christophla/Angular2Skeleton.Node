
/**
 * Application theming provider
 */
export interface IAppThemingProvider extends ng.IServiceProvider {
    setRegisteredPalettes(registeredPalettes: any): void;
    setRegisteredThemes(registeredThemes: any): void;
}

/**
 * Application theming service
 */
export interface IAppThemingService {
    getRegisteredPalettes(): void;
    getRegisteredThemes(): string;
    setActiveTheme(themeName: string): void;
    setThemesList(themeList): void;
}

/**
 * Application theming service implementation
 */
export class AppThemingService implements IAppThemingService {

    private themes: any;

    /**
     * Create a new app theming service instance
     *
     * @param registeredPallettes   The registered pallettes
     * @param registeredThemes      The registered themes
     * @param $cookies              The cookies service
     * @param $log                  The log service
     */
    constructor(
        private registeredPallettes: any,
        private registeredThemes: any,
        private $cookies: ng.cookies.ICookieStoreService,
        private $log: ng.ILogService
    ) {

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
    public getRegisteredPalettes() {
        return this.registeredPallettes;
    }

    /**
     * Get registered themes
     *
     * @returns {*}
     */
    public getRegisteredThemes() {
        return this.registeredThemes;
    }

    /**
     * Set active theme
     *
     * @param themeName The name of the active theme
     */
    public setActiveTheme(themeName: string) {

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
    public setThemesList(themeList) {
        this.themes.list = themeList;
    }
}

/**
 * Application theming provider implementation
 */
export class AppThemingProvider implements IAppThemingProvider {

    private registeredPallettes;
    private registeredThemes;

    /**
    * Set registered palettes
    *
    * @param _registeredPalettes
    */
    public setRegisteredPalettes(_registeredPalettes) {
        this.registeredPallettes = _registeredPalettes;
    }

    /**
     * Set registered themes
     *
     * @param _registeredThemes
     */
    public setRegisteredThemes(_registeredThemes) {
        this.registeredThemes = _registeredThemes;
    }

    /**
     * Returns an instance of the [IAppThemingService]
     */
    public $get($log: ng.ILogService, $cookies: ng.cookies.ICookieStoreService): IAppThemingService {
        return new AppThemingService(this.registeredPallettes, this.registeredThemes, $cookies, $log);
    }
}
