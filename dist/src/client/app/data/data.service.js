/// <reference path="data.module.ts" />
var Data;
(function (Data) {
    /**
     * Data access service facade implementation
     */
    var DataService = (function () {
        /**
         * Creates a new instance of the data service facade
         *
         * @param accounts
         */
        function DataService(datasets, reports) {
            this.datasets = datasets;
            this.reports = reports;
        }
        DataService.$inject = [
            'datasetRepository',
            'reportRepository'
        ];
        return DataService;
    }());
    /**
     * Module Registration
     */
    angular
        .module('app.data')
        .service('dataService', DataService);
})(Data || (Data = {}));
//# sourceMappingURL=data.service.js.map