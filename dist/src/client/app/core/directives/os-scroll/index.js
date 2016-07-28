"use strict";
require('angular');
const directive_1 = require('./directive');
const directive_2 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .provider('osScrollConfig', () => new directive_1.ScrollConfigProvider())
    .directive('osScroll', directive_2.ScrollDirective.factory());
//# sourceMappingURL=index.js.map