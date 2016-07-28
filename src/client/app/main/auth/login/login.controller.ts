/// <reference path="login.module.ts" />
module Auth {

    interface ILoginForm {
        email: string;
        password: string;
        remember_me: boolean;
    }

    class LoginController {

        public static $inject = ['$state', 'dataService', 'osPrincipal', 'osProfile', 'Account'];

        public form: ILoginForm;

        constructor(
            private $state: ng.ui.IStateService,
            private dataService: Data.IDataService,
            private osPrincipal: Core.IPrincipal,
            private osProfile: Core.IProfileService<Auth.IProfile>,
            private account: any
        ) {
        }

        public login() {

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

    /**
     * Module Registration
     */
    angular
        .module('app.auth.login')
        .controller('LoginController', LoginController);

}
