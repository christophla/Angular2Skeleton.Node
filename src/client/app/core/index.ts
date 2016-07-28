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

import './directives/index';

/**
 * Core module
 */
angular
    .module('os.core',
    [
        '$ariaProvider',
        '$logProvider',
        '$translateProvider',
        '$provide',
        'osConfigProvider',
        'osPrincipalProvider',
        'osScrollConfigProvider',
        'CacheFactoryProvider',
        'angular-cache',
        'as.sortable',
        'chart.js',
        'LocalStorageModule',
        'mdPickers',
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMaterial',
        'ngMaterialDatePicker',
        'ngMessages',
        'ngSanitize',
        'nvd3',
        'pascalprecht.translate',
        'restangular',
        'tc.chartjs',
        'textAngular',
        'timer',
        'ui.router',
        'ui.sortable',
        'xeditable',
        'youtube-embed'
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
    .config(ThemeConfig)
    .config(Config)
    .run(RunBlock);


