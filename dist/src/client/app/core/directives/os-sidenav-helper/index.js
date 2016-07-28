"use strict";
require('angular');
var directive_1 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osSidenavHelper', function () { return new directive_1.SidenavHelperDirective(); });
//# sourceMappingURL=index.js.map