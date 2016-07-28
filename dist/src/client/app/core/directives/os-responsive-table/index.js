"use strict";
require('angular');
const directive_1 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osResponsiveTable', () => new directive_1.ResponsiveTableDirective());
//# sourceMappingURL=index.js.map