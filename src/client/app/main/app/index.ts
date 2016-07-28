import 'angular';
import 'angular-route';

angular.module('app', ['ngRoute'])
    .component('pageAbout', new PageAboutComponent())
    .config(routesConfig);