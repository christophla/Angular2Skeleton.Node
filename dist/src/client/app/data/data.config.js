/// <reference path="data.module.ts" />
var Data;
(function (Data) {
    /**
     * Configures the data module
     *
     * @param restangularProvider
     */
    function config(restangularProvider) {
        restangularProvider.setBaseUrl('api');
    }
    /**
     * Module registration
     */
    angular
        .module('app.data')
        .config(['RestangularProvider', config]);
})(Data || (Data = {}));
//# sourceMappingURL=data.config.js.map