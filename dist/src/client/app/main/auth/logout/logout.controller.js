/// <reference path="logout.module.ts" />
var Auth;
(function (Auth) {
    class LogoutController {
        constructor($state, osPrincipal) {
            this.$state = $state;
            this.osPrincipal = osPrincipal;
        }
    }
    LogoutController.$inject = ['$state', 'osPrincipal'];
    /**
     * Module Registration
     */
    angular
        .module('app.auth.logout')
        .controller('LogoutController', LogoutController);
})(Auth || (Auth = {}));
//# sourceMappingURL=logout.controller.js.map