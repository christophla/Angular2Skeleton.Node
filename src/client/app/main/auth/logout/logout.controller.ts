/// <reference path="logout.module.ts" />
module Auth {

    class LogoutController {

        public static $inject = ['$state', 'osPrincipal'];

        constructor(
            private $state: ng.ui.IStateService,
            private osPrincipal: Core.IPrincipal
        ) {
        }

    }

    /**
     * Module Registration
     */
    angular
        .module('app.auth.logout')
        .controller('LogoutController', LogoutController);

}
