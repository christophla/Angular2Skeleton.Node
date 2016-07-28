/// <reference path="forgot-password.module.ts" />
module Auth {

    class ForgotPasswordController {
        
    }

    /**
     * Module registration
     */
    angular
        .module('app.auth.forgot-password')
        .controller('ForgotPasswordController', ForgotPasswordController);
        
}