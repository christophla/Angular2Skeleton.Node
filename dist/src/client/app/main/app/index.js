"use strict";
require('angular');
require('angular-route');
angular.module('app', ['ngRoute'])
    .component('pageAbout', new PageAboutComponent())
    .config(routesConfig);
//# sourceMappingURL=index.js.map