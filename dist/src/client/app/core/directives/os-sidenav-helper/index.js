"use strict";
require('angular');
const directive_1 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osSidenavHelper', () => new directive_1.SidenavHelperDirective());
//# sourceMappingURL=index.js.map