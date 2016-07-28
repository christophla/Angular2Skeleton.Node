/// <reference path="data.module.ts" />

module Data {

    /**
     * Configures the data module
     *
     * @param restangularProvider
     */
    function config(
        restangularProvider: restangular.IProvider
    ) {
        restangularProvider.setBaseUrl('api');
    }

    /**
     * Module registration
     */
    angular
        .module('app.data')
        .config(['RestangularProvider', config]);

}
