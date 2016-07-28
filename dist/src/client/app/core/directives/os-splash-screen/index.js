"use strict";
require('angular');
const directive_1 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osSplashScreen', directive_1.SplashScreenDirective.factory());
//# sourceMappingURL=index.js.map