/// <reference path="login.module.ts" />
var Auth;
(function (Auth) {
    class LoginController {
        constructor($state, dataService, osPrincipal, osProfile, account) {
            this.$state = $state;
            this.dataService = dataService;
            this.osPrincipal = osPrincipal;
            this.osProfile = osProfile;
            this.account = account;
        }
        login() {
            // this.dataService.accounts.authenticate(
            //     this.form.email,
            //     this.form.password
            // ).then((data: Data.IAuthenticationToken) => {
            //
            //     // principal
            //
            //     this.osPrincipal.authenticate(
            //         {
            //             name: data.user.email,
            //             roles: ['user'],
            //             token: undefined // use sdk
            //         },
            //         this.form.remember_me
            //     );
            //
            //     // profile
            //
            //     var profile: IProfile = {
            //         email: data.user.email,
            //         familyName: data.user.familyName,
            //         givenName: data.user.givenName
            //     };
            //
            //     this.osProfile.set(profile);
            //
            //     this.$state.go('app.home', {});
            //
            // }, error => {
            //     // TODO: Add error message
            // });
        }
    }
    LoginController.$inject = ['$state', 'dataService', 'osPrincipal', 'osProfile', 'Account'];
    /**
     * Module Registration
     */
    angular
        .module('app.auth.login')
        .controller('LoginController', LoginController);
})(Auth || (Auth = {}));
//# sourceMappingURL=login.controller.js.map