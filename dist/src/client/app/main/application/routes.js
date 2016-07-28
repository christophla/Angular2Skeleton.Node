"use strict";
/**
 * Configures the module routes
 *
 * @param $stateProvider
 * @param $urlRouterProvider
 * @param $locationProvider
 */
class RouteConfig {
    constructor($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/reporting/reports');
        /**
         * Layout Style Switcher
         */
        var $cookies;
        angular.injector(['ngCookies']).invoke([
            '$cookies', cookies => {
                $cookies = cookies;
            }
        ]);
        // Get active layout
        var layoutStyle = $cookies.get('layoutStyle') || 'contentOnly';
        var layouts = {
            contentOnly: {
                main: 'app/core/layouts/content-only.html',
                navigation: '',
                toolbar: ''
            },
            contentWithToolbar: {
                main: 'app/core/layouts/content-with-toolbar.html',
                navigation: '',
                toolbar: 'app/main/toolbar/layouts/content-with-toolbar/toolbar.html'
            },
            horizontalNavigation: {
                main: 'app/core/layouts/horizontal-navigation.html',
                navigation: 'app/main/navigation/layouts/horizontal-navigation/navigation.html',
                toolbar: 'app/main/toolbar/layouts/horizontal-navigation/toolbar.html'
            },
            verticalNavigation: {
                main: 'app/core/layouts/vertical-navigation.html',
                navigation: 'app/main/navigation/layouts/vertical-navigation/navigation.html',
                toolbar: 'app/main/toolbar/layouts/vertical-navigation/toolbar.html'
            }
        };
        // State definitions
        $stateProvider
            .state('app', {
            abstract: true,
            // resolve: {
            //     authorize: ['osAuthorizationService',
            //         (security: Core.IAuthorizationService) => security.authorize()
            //     ]
            // },
            views: {
                'main@': {
                    controller: 'MainController as vm',
                    templateUrl: layouts[layoutStyle].main
                },
                'toolbar@app': {
                    controller: 'ToolbarController as vm',
                    templateUrl: layouts[layoutStyle].toolbar
                },
                'navigation@app': {
                    controller: 'NavigationController as vm',
                    templateUrl: layouts[layoutStyle].navigation
                }
            }
        });
    }
}
RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
exports.RouteConfig = RouteConfig;
//# sourceMappingURL=routes.js.map