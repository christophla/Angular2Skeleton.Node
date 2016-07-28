"use strict";
require('angular');
var directive_1 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osResponsiveTable', function () { return new directive_1.ResponsiveTableDirective(); });
//# sourceMappingURL=index.js.map