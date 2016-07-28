"use strict";
require('angular');
var directive_1 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osSearchBar', directive_1.SearchBarDirective.factory());
//# sourceMappingURL=index.js.map