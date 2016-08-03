import 'angular';

import {AppPalettes} from './theming/palettes';
import {AppThemes} from './theming/themes';
import {AppThemeGeneratorService} from './theming/generator';
import {AppThemingProvider} from './theming/provider';
import {ThemeConfig} from './theming/config';

import * as BasicFilters from './filters/basic';
import * as TagFilters from './filters/tags';

import {OSConfigurationServiceProvider} from './config/index';

import {PluginConfigurationProvider} from './plugins';
import {ProfileProvider} from './profile';

import {EventService} from './services/events';
import {LoggingService} from './services/logging';
import {Utils} from './services/utils';

import {AuthorizationService} from './security/authorization';
import {PrincipalProvider} from './security/principal';

import {Config} from './config';
import {CoreService} from './service';
import {RunBlock} from './run';

// directives

import {CardDirective} from './directives/os-card';
import {FormWizardController} from './directives/os-form-wizard';
import {FormWizardDirective} from './directives/os-form-wizard';
import {FormWizardFormDirective} from './directives/os-form-wizard';
import {NavigationController} from './directives/os-navigation/controller';
import {NavigationDirective} from './directives/os-navigation/vertical';
import {NavigationHorizontalDirective} from './directives/os-navigation/horizontal';
import {NavigationHorizontalItemDirective} from './directives/os-navigation/horizontal';
import {NavigationHorizontalNodeController} from './directives/os-navigation/horizontal';
import {NavigationHorizontalNodeDirective} from './directives/os-navigation/horizontal';
import {NavigationItemDirective} from './directives/os-navigation/vertical';
import {NavigationNodeController} from './directives/os-navigation/vertical';
import {NavigationNodeDirective} from './directives/os-navigation/vertical';
import {NavigationServiceProvider} from './directives/os-navigation/service';
import {RandomClassDirective} from './directives/os-random-class';
import {ResponsiveTableDirective} from './directives/os-responsive-table';
import {ScrollConfigProvider} from './directives/os-scroll';
import {ScrollDirective} from './directives/os-scroll';
import {SearchBarDirective} from './directives/os-search-bar';
import {SidenavHelperDirective} from './directives/os-sidenav-helper';
import {SplashScreenDirective} from './directives/os-splash-screen';
import {OsTimelineController} from './directives/os-timeline';
import {osTimelineDirective} from './directives/os-timeline';
import {osTimelineItemDirective} from './directives/os-timeline';
import {WidgetController} from './directives/os-widget';
import {WidgetDirective} from './directives/os-widget';
import {WidgetFrontDirective} from './directives/os-widget';
import {WidgetBackDirective} from './directives/os-widget';

/**
 * Core module
 */
angular
    .module('os.core',
    [
        // '$ariaProvider',
        // '$logProvider',
        // '$translateProvider',
        // '$provide',
        // 'osConfigProvider',
        // 'osPrincipalProvider',
        // 'osScrollConfigProvider',
        // 'CacheFactoryProvider',
        'angular-cache',
        'as.sortable',
        // 'chart.js',
        // 'LocalStorageModule',
        // 'mdPickers',
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMaterial',
        // 'ngMaterialDatePicker',
        'ngMessages',
        'ngSanitize',
        // 'nvd3',
        'pascalprecht.translate',
        'restangular',
        // 'tc.chartjs',
        // 'textAngular',
        'timer',
        'ui.router',
        'ui.sortable',
        // 'xeditable',
        // 'youtube-embed'
    ])

    .factory('underscore', ['$window', $window => $window._])
    .filter('toTrusted', BasicFilters.toTrustedFilter)
    .filter('htmlToPlaintext', BasicFilters.htmlToPlainTextFilter)
    .filter('nospace', BasicFilters.nospaceFilter)
    .filter('humanizeDoc', BasicFilters.humanizeDocFilter)
    .filter('filterByTags', TagFilters.filterByTags)
    .filter('filterSingleByTags', TagFilters.filterSingleByTags)
    .provider('appTheming', AppThemingProvider)
    .provider('osConfig', OSConfigurationServiceProvider)
    .provider('osPrincipal', PrincipalProvider)
    .provider('osProfile', ProfileProvider)
    .provider('osPluginsConfig', PluginConfigurationProvider)
    .service('appThemeGenerator', AppThemeGeneratorService)
    .service('osAuthorizationService', AuthorizationService)
    .service('osCoreService', CoreService)
    .service('osEventService', EventService)
    .service('osLoggingService', LoggingService)
    .service('osUtils', Utils)
    .constant('appPalettes', AppPalettes.palettes)
    .constant('appThemes', AppThemes.themes)

    // os-card
    .directive('osCard', () => new CardDirective())

    // os-form-wizard
    .controller('osFormWizardController', FormWizardController)
    .directive('osFormWizard', () => new FormWizardDirective())
    .directive('osFormWizardForm', () => new FormWizardFormDirective())

    // os-navigation
    .provider('osNavigationService', NavigationServiceProvider)
    .controller('MsNavigationHorizontalNodeController', NavigationHorizontalNodeController)
    .controller('OsNavigationController', NavigationController)
    .directive('osNavigationHorizontal', NavigationHorizontalDirective.factory())
    .directive('osNavigationHorizontalItem', NavigationHorizontalItemDirective.factory())
    .directive('osNavigationHorizontalNode', () => new NavigationHorizontalNodeDirective())
    .directive('osNavigation', NavigationDirective.factory())
    .directive('osNavigationNode', () => new NavigationNodeDirective())
    .directive('osNavigationItem', () => new NavigationItemDirective())
    .controller('MsNavigationNodeController', NavigationNodeController)

    // os-random-class
    .directive('osRandomClass', () => new RandomClassDirective())

    // os-reposnsive-table
    .directive('osResponsiveTable', () => new ResponsiveTableDirective())

    // os-scroll
    .provider('osScrollConfig', () => new ScrollConfigProvider())
    .directive('osScroll', ScrollDirective.factory())

    // os-searchbar
    .directive('osSearchBar', SearchBarDirective.factory())

    // os-sidenav-helper
    .directive('osSidenavHelper', () => new SidenavHelperDirective())

    // os-splash-screen
    .directive('osSplashScreen', SplashScreenDirective.factory())

    // os-timeline
    .controller('OsTimelineController', OsTimelineController)
    .directive('osTimeline', osTimelineDirective)
    .directive('osTimelineItem', osTimelineItemDirective)

    // os-widget
    .controller('OsWidgetController', WidgetController)
    .directive('osWidget', WidgetDirective.factory())
    .directive('osWidgetFront', WidgetFrontDirective.factory())
    .directive('osWidgetBack', WidgetBackDirective.factory())

    .config(ThemeConfig)
    .config(Config)
    .run(RunBlock);


