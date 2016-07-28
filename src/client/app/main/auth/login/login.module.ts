
module Auth {

    /**
     * Configures the auth login module
     * 
     * @param $stateProvider
     * @param $translatePartialLoaderProvider
     * @param msNavigationServiceProvider
     */
    function config(
        $stateProvider: ng.ui.IStateProvider,
        $translatePartialLoaderProvider: ng.translate.ITranslatePartialLoaderProvider
    ) {
        // State
        $stateProvider.state('app.auth_login', {
            url: '/auth/login',
            views: {
                'main@': {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller: 'MainController as vm'
                },
                'content@app.auth_login': {
                    templateUrl: 'app/main/auth/login/login.html',
                    controller: 'LoginController as vm'
                }
            },
            data: {
                bodyClass: 'login'
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/auth/login');

    }

    /**
     * Module Registration
     */
    angular
        .module('app.auth.login', [])
        .config(config);

}