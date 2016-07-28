/// <reference path="../../../../../typings/index.d.ts" />

module Home {


    /**
     * Module Configuration
     */
    angular
        .module('app.home', [])
        .config(['$stateProvider', 'osNavigationServiceProvider', (
            $stateProvider: ng.ui.IStateProvider, osNavigationServiceProvider) => {

            // State

            $stateProvider.state('app.home', {
                url: '/home',
                views: {
                    'content@app': {
                        controller: 'HomeController as vm',
                        templateUrl: 'app/main/home/home.html'
                    }
                }
            });

            // Navigation

            osNavigationServiceProvider.saveItem('home', {
                icon: 'icon-home',
                state: 'app.home',
                title: 'Home',
                // translate: 'SYSTEM.SETTINGS.GENERAL.TITLE',
                weight: 1
            });
        }]);

}
