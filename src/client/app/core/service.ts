
import {IEventService} from './services/events';
import {ILoggingService} from './services/logging';
import {INavigationService} from './directives/os-navigation/service';
import {IPluginConfigurationService} from './plugins';

/**
 * Core service facade
 */
export interface ICoreService {
    logging: ILoggingService;
    navigation: INavigationService;
    plugins: IPluginConfigurationService;
}


/**
 * Core service facade implementation
 */
export class CoreService implements ICoreService {

    public static $inject = [
        'osLoggingService',
        'osNavigationService',
        'osPluginsConfig'
    ];

    public logging: ILoggingService;
    public navigation: INavigationService;
    public plugins: IPluginConfigurationService;

    /**
     * Creates a new instance of the core service facade
     *
     * @param logging       The logging service
     * @param navigation    The nvigation service
     * @param plugins       The plugin configuration service
     */
    constructor(
        logging: ILoggingService,
        navigation: INavigationService,
        plugins: IPluginConfigurationService
    ) {
        this.logging = logging;
        this.navigation = navigation;
        this.plugins = plugins;
    }
}

