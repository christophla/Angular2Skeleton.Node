/// <reference path="data.module.ts" />
var Data;
(function (Data) {
    /**
     * Data access service facade implementation
     */
    class DataService {
        /**
         * Creates a new instance of the data service facade
         *
         * @param accounts
         */
        constructor(datasets, reports) {
            this.datasets = datasets;
            this.reports = reports;
        }
    }
    DataService.$inject = [
        'datasetRepository',
        'reportRepository'
    ];
    /**
     * Module Registration
     */
    angular
        .module('app.data')
        .service('dataService', DataService);
})(Data || (Data = {}));
//# sourceMappingURL=data.service.js.map