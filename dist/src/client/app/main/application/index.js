"use strict";
require('angular');
var controllers_1 = require('./controllers');
var routes_1 = require('./routes');
var run_1 = require('./run');
angular.module('app.application', [])
    .controller('IndexController', controllers_1.IndexController)
    .config(routes_1.RouteConfig)
    .run(run_1.RunBlock);
//# sourceMappingURL=index.js.map