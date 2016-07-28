"use strict";
require('angular');
var directive_1 = require('./directive');
var directive_2 = require('./directive');
var directive_3 = require('./directive');
var directive_4 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .controller('OsWidgetController', directive_1.WidgetController)
    .directive('osWidget', directive_2.WidgetDirective.factory())
    .directive('osWidgetFront', directive_3.WidgetFrontDirective.factory())
    .directive('osWidgetBack', directive_4.WidgetBackDirective.factory());
//# sourceMappingURL=index.js.map