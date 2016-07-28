"use strict";
require('angular');
var directive_1 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osRandomClass', function () { return new directive_1.RandomClassDirective(); });
//# sourceMappingURL=index.js.map