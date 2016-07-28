"use strict";
require('angular');
var directive_1 = require('./directive');
var directive_2 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .provider('osScrollConfig', function () { return new directive_1.ScrollConfigProvider(); })
    .directive('osScroll', directive_2.ScrollDirective.factory());
//# sourceMappingURL=index.js.map