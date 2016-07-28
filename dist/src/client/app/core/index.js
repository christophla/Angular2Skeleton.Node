"use strict";
require('angular');
var palettes_1 = require('./theming/palettes');
var themes_1 = require('./theming/themes');
var generator_1 = require('./theming/generator');
var provider_1 = require('./theming/provider');
var config_1 = require('./theming/config');
var BasicFilters = require('./filters/basic');
var TagFilters = require('./filters/tags');
var index_1 = require('./config/index');
var plugins_1 = require('./plugins');
var profile_1 = require('./profile');
var events_1 = require('./services/events');
var logging_1 = require('./services/logging');
var utils_1 = require('./services/utils');
var authorization_1 = require('./security/authorization');
var principal_1 = require('./security/principal');
var config_2 = require('./config');
var service_1 = require('./service');
var run_1 = require('./run');
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
    .factory('underscore', ['$window', function ($window) { return $window._; }])
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