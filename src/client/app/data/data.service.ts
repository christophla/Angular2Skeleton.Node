/// <reference path="data.module.ts" />

module Data {

    /**
     * Data access service facade
     */
    export interface IDataService {
        datasets: IDatasetRepository;
        reports: IReportRepository;
    }

    /**
     * Data access service facade implementation
     */
    class DataService implements IDataService {

        public static $inject = [
            'datasetRepository',
            'reportRepository'
        ];

        public datasets: IDatasetRepository;
        public reports: IReportRepository;

        /**
         * Creates a new instance of the data service facade
         *
         * @param accounts
         */
        constructor(
            datasets: IDatasetRepository,
            reports: IReportRepository
        ) {
            this.datasets = datasets;
            this.reports = reports;
        }
    }


    /**
     * Module Registration
     */
    angular
        .module('app.data')
        .service('dataService', DataService);
}
