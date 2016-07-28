
/**
 * Plugin configuration
 */
export interface IPluginConfiguration {
    description?: string;
    icon?: string;
    id: string;
    name: string;
    template: string;
}

/**
 * Plugin configuration service
 */
export interface IPluginConfigurationService {
    findPluginConfiguration(id: string): IPluginConfiguration;
    getPluginConfigurations(): Array<IPluginConfiguration>;
}

/**
 * Plugin configuration provider
 */
export interface IPluginConfigurationProvider extends ng.IServiceProvider {
    addPlugin(configuration: IPluginConfiguration): void;
}

/**
 * Plugin configuration service implementation
 */
export class PluginConfigurationService implements IPluginConfigurationService {

    /**
     * Creates a new instance of the plugin configuration service
     *
     * @param configurations
     */
    constructor(private configurations: Array<IPluginConfiguration>) {
    }

    public getPluginConfigurations() {
        return this.configurations;
    }

    public findPluginConfiguration(id: string) {
        var index = this.configurations.map((x) => { return x.id }).indexOf(id);
        return this.configurations[index];
    }
}

/**
 * Plugin configuration provider implementation
 */
export class PluginConfigurationProvider implements IPluginConfigurationProvider {

    private configurations: Array<IPluginConfiguration>;

    constructor() {
        this.configurations = [];
    }

    /**
     * Adds a plugin
     *
     * @param configuration The plugin configuration
     */
    public addPlugin(configuration: IPluginConfiguration) {

        this.configurations.push(configuration);
    }

    /**
     * Service
     */
    public $get(): IPluginConfigurationService {
        return new PluginConfigurationService(this.configurations);
    }
}

