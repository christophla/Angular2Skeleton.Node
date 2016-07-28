"use strict";
require('angular');
const directive_1 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osCard', () => new directive_1.CardDirective());
//# sourceMappingURL=index.js.map