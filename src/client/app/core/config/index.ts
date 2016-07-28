
/**
 * OS Configuration Service
 */
export interface IOSConfiguration {
    getConfig(configName: string);
    setConfig(configName: string, configValue: any);
}


/**
 * OS Configuration Settings
 */
export interface IOSConfigurationSettings {
    disableCustomScrollbars: Boolean;
    disableMdInkRippleOnMobile: Boolean;
    disableCustomScrollbarsOnMobile: Boolean;
    pluginDirectory: string;
}


/**
 * OS Configuration Provider
 */
export interface IOSConfigurationProvider extends ng.IServiceProvider {
    config(configuration: IOSConfigurationSettings);
}


/**
 * OS Configuration Service
 */
export class OSConfigurationService implements IOSConfiguration {

    public static $inject = ['osConfiguration'];

    /**
     * Constructor
     * @param osConfiguration The configuration settings
     */
    constructor(private osConfiguration: IOSConfigurationSettings) { }

    /**
     * Returns a config value
     * @param configName The configuration element name
     */
    public getConfig(configName: string) {
        if (angular.isUndefined(this.osConfiguration[configName])) {
            return false;
        }

        return this.osConfiguration[configName];
    }

    /**
    * Creates or updates config object
    *
    * @param configName     The configuration element name
    * @param configValue    The configuration element value
    */
    public setConfig(configName: string, configValue: any) {
        this.osConfiguration[configName] = configValue;
    }
}


/**
 * OS Configuration Provider
 */
export class OSConfigurationServiceProvider implements IOSConfigurationProvider {

    // Default Configuration
    private osConfiguration: IOSConfigurationSettings = {
        disableCustomScrollbars: false,
        disableCustomScrollbarsOnMobile: true,
        disableMdInkRippleOnMobile: true,
        pluginDirectory: 'app/plugins'
    };

    /**
     * Extend default configuration with the given one
     *
     * @param configuration The application configuration settings
     */
    public config(configuration: IOSConfigurationSettings) {
        this.osConfiguration = angular.extend({}, this.osConfiguration, configuration);
    }

    /**
     * Service
     */
    public $get(): IOSConfiguration {
        return new OSConfigurationService(this.osConfiguration);
    }
}
