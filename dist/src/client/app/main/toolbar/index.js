"use strict";
require('angular');
var controllers_1 = require('./controllers');
var config_1 = require('./config');
/**
 * Module
 */
angular
    .module('app.toolbar')
    .controller('ToolbarController', controllers_1.ToolbarController)
    .config(config_1.config);
//# sourceMappingURL=index.js.map