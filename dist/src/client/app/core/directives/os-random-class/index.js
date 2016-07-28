"use strict";
require('angular');
const directive_1 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osRandomClass', () => new directive_1.RandomClassDirective());
//# sourceMappingURL=index.js.map