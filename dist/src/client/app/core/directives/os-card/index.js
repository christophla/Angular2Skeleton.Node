"use strict";
require('angular');
var directive_1 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osCard', function () { return new directive_1.CardDirective(); });
//# sourceMappingURL=index.js.map