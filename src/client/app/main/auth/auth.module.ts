/// <reference path="../../../../../typings/index.d.ts" />

module Auth {

    angular
        .module('app.auth', [
            'app.auth.forgot-password',
            'app.auth.login',
            'app.auth.logout'
        ]);
}
