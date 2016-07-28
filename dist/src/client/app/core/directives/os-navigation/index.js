"use strict";
require('angular');
const controller_1 = require('./controller');
const vertical_1 = require('./vertical');
const horizontal_1 = require('./horizontal');
const horizontal_2 = require('./horizontal');
const horizontal_3 = require('./horizontal');
const horizontal_4 = require('./horizontal');
const vertical_2 = require('./vertical');
const vertical_3 = require('./vertical');
const vertical_4 = require('./vertical');
const service_1 = require('./service');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .provider('osNavigationService', service_1.NavigationServiceProvider)
    .controller('MsNavigationHorizontalNodeController', horizontal_3.NavigationHorizontalNodeController)
    .controller('OsNavigationController', controller_1.NavigationController)
    .directive('osNavigationHorizontal', horizontal_1.NavigationHorizontalDirective.factory())
    .directive('osNavigationHorizontalItem', horizontal_2.NavigationHorizontalItemDirective.factory())
    .directive('osNavigationHorizontalNode', () => new horizontal_4.NavigationHorizontalNodeDirective())
    .directive('osNavigation', vertical_1.NavigationDirective.factory())
    .directive('osNavigationNode', () => new vertical_4.NavigationNodeDirective())
    .directive('osNavigationItem', () => new vertical_2.NavigationItemDirective())
    .controller('MsNavigationNodeController', vertical_3.NavigationNodeController);
//# sourceMappingURL=index.js.map