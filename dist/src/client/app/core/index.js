"use strict";
require('angular');
const palettes_1 = require('./theming/palettes');
const themes_1 = require('./theming/themes');
const generator_1 = require('./theming/generator');
const provider_1 = require('./theming/provider');
const config_1 = require('./theming/config');
const BasicFilters = require('./filters/basic');
const TagFilters = require('./filters/tags');
const index_1 = require('./config/index');
const plugins_1 = require('./plugins');
const profile_1 = require('./profile');
const events_1 = require('./services/events');
const logging_1 = require('./services/logging');
const utils_1 = require('./services/utils');
const authorization_1 = require('./security/authorization');
const principal_1 = require('./security/principal');
const config_2 = require('./config');
const service_1 = require('./service');
const run_1 = require('./run');
require('./directives/index');
/**
 * Core module
 */
angular
    .module('os.core', [
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
    .provider('appTheming', provider_1.AppThemingProvider)
    .provider('osConfig', index_1.OSConfigurationServiceProvider)
    .provider('osPrincipal', principal_1.PrincipalProvider)
    .provider('osProfile', profile_1.ProfileProvider)
    .provider('osPluginsConfig', plugins_1.PluginConfigurationProvider)
    .service('appThemeGenerator', generator_1.AppThemeGeneratorService)
    .service('osAuthorizationService', authorization_1.AuthorizationService)
    .service('osCoreService', service_1.CoreService)
    .service('osEventService', events_1.EventService)
    .service('osLoggingService', logging_1.LoggingService)
    .service('osUtils', utils_1.Utils)
    .constant('appPalettes', palettes_1.AppPalettes.palettes)
    .constant('appThemes', themes_1.AppThemes.themes)
    .config(config_1.ThemeConfig)
    .config(config_2.Config)
    .run(run_1.RunBlock);
//# sourceMappingURL=index.js.map