
import {IOSConfigurationProvider} from './config/index';
import {IPrincipalProvider} from './security/principal';
import {IScrollConfigProvider} from './directives/os-scroll/directive';

/**
 * Configures the core module
 *
 * @param $ariaProvider             Aria accessibility provider
 * @param $logProvider              Core log provider
 * @param osScrollConfigProvider    Scroll configuration provider
 * @param $translateProvider        Translation provider
 * @param $provide                  Angular auto provide
 * @param osConfigProvider          Application configuration provider
 */
export class Config {

    constructor(
        $ariaProvider,
        $logProvider: ng.ILogProvider,
        $translateProvider,
        $provide: ng.auto.IProvideService,
        osConfigProvider: IOSConfigurationProvider,
        osPrincipalProvider: IPrincipalProvider,
        osScrollConfigProvider: IScrollConfigProvider,
        cacheFactoryProvider: any
    ) {

        // cache configuration
        angular.extend(cacheFactoryProvider.defaults, {
            maxAge: 15 * 60 * 1000,
            storageMode: 'localStorage'
        });

        // ng-aria configuration
        $ariaProvider.config({
            tabindex: false
        });

        // Enable debug logging
        $logProvider.debugEnabled(true);

        // Principal
        osPrincipalProvider.config({
            enableRememberMe: true,
            states: {
                accessdenied: 'app.auth.access_denied',
                login: 'app.auth_login'
            }
        });

        // osScroll configuration
        osScrollConfigProvider.config({
            wheelPropagation: true
        });

        // toastr configuration
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = true;

        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');

        // Text Angular options
        $provide.decorator('taOptions', [
            '$delegate', taOptions => {
                taOptions.toolbar = [
                    ['bold', 'italics', 'underline', 'ul', 'ol', 'quote']
                ];

                taOptions.classes = {
                    disabled: '',
                    focussed: 'focussed',
                    htmlEditor: 'form-control',
                    textEditor: 'form-control',
                    toolbar: 'ta-toolbar',
                    toolbarButton: 'md-button',
                    toolbarButtonActive: 'active',
                    toolbarGroup: 'ta-group'
                };

                return taOptions;
            }
        ]);

        // Text Angular tools
        $provide.decorator('taTools', [
            '$delegate', taTools => {

                taTools.bold.iconclass = 'icon-format-bold';
                taTools.italics.iconclass = 'icon-format-italic';
                taTools.underline.iconclass = 'icon-format-underline';
                taTools.ul.iconclass = 'icon-format-list-bulleted';
                taTools.ol.iconclass = 'icon-format-list-numbers';
                taTools.quote.iconclass = 'icon-format-quote';

                return taTools;
            }
        ]);

        // App configurations
        osConfigProvider.config({
            disableCustomScrollbars: false,
            disableCustomScrollbarsOnMobile: true,
            disableMdInkRippleOnMobile: true,
            pluginDirectory: 'app/plugins'
        });
    }
}
