var Auth;
(function (Auth) {
    /**
     * Configures the forgot-password module
     *
     * @param $stateProvider
     * @param $translatePartialLoaderProvider
     */
    function config($stateProvider, $translatePartialLoaderProvider) {
        // State
        $stateProvider.state('app.auth_forgot-password', {
            url: '/auth/forgot-password',
            views: {
                'main@': {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller: 'MainController as vm'
                },
                'content@app.auth_forgot-password': {
                    templateUrl: 'app/main/auth/forgot-password/forgot-password.html',
                    controller: 'ForgotPasswordController as vm'
                }
            },
            data: {
                bodyClass: 'forgot-password'
            }
        });
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/auth/forgot-password');
        // Navigation
        //msNavigationServiceProvider.saveItem('pages.auth.forgot-password', {
        //    title: 'Forgot Password',
        //    state: 'app.pages_auth_forgot-password',
        //    weight: 5
        //});
    }
    /**
     * Module registration
     */
    angular
        .module('app.auth.forgot-password', [])
        .config(config);
})(Auth || (Auth = {}));
//# sourceMappingURL=forgot-password.module.js.map