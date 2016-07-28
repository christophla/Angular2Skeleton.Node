var Auth;
(function (Auth) {
    /**
     * Configures the auth login module
     *
     * @param $stateProvider
     * @param $translatePartialLoaderProvider
     * @param msNavigationServiceProvider
     */
    function config($stateProvider, $translatePartialLoaderProvider) {
        // State
        $stateProvider.state('app.auth_logout', {
            data: {
                bodyClass: 'logout'
            },
            url: '/auth/logout',
            views: {
                'content@app.auth_logout': {
                    controller: 'LogoutController as vm',
                    templateUrl: 'app/main/auth/logout/logout.html'
                },
                'main@': {
                    controller: 'MainController as vm',
                    templateUrl: 'app/core/layouts/content-only.html',
                }
            }
        });
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/auth/logout');
    }
    /**
     * Module Registration
     */
    angular
        .module('app.auth.logout', [])
        .config(config);
})(Auth || (Auth = {}));
//# sourceMappingURL=logout.module.js.map