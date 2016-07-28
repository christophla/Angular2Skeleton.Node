"use strict";
require('angular');
var controller_1 = require('./controller');
var vertical_1 = require('./vertical');
var horizontal_1 = require('./horizontal');
var horizontal_2 = require('./horizontal');
var horizontal_3 = require('./horizontal');
var horizontal_4 = require('./horizontal');
var vertical_2 = require('./vertical');
var vertical_3 = require('./vertical');
var vertical_4 = require('./vertical');
var service_1 = require('./service');
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
    .directive('osNavigationHorizontalNode', function () { return new horizontal_4.NavigationHorizontalNodeDirective(); })
    .directive('osNavigation', vertical_1.NavigationDirective.factory())
    .directive('osNavigationNode', function () { return new vertical_4.NavigationNodeDirective(); })
    .directive('osNavigationItem', function () { return new vertical_2.NavigationItemDirective(); })
    .controller('MsNavigationNodeController', vertical_3.NavigationNodeController);
//# sourceMappingURL=index.js.map