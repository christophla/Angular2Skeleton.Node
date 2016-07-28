/// <reference path='../reporting.module.ts' />

module Reporting {

    /**
     * Holds state of the currently displayed report
     */
    export interface IReportService {
        current: ICurrentReport;
        getReportData(boardId: string): ng.IPromise<Data.IReport>;
        transformDatasetResult(reportItem: Data.IReportItem): any;
    }

    export interface ICurrentReport {
        data?: Data.IDatasetResult;
        dataset?: Data.IDataset;
        report?: Data.IReport;
    }

    interface IServiceScope extends ng.IRootScopeService {
        currentReport: Data.IReport;
    }

    export class ReportService implements IReportService {

        public static $inject = ['$q', 'osCoreService', 'dataService'];

        public current: ICurrentReport;
        public hasChanges: boolean;

        constructor(
            private $q: ng.IQService,
            private coreService: Core.ICoreService,
            private dataService: Data.IDataService
        ) {
            this.current = {
                data: null,
                dataset: null,
                report: null
            };

            this.hasChanges = false;

        }

        /**
         * Load report data from the server and sets as current
         * @param  {string}                    reportId The report identifier
         * @return {ng.IPromise<Data.IReport>}          The report data
         */
        public getReportData(reportId: string): ng.IPromise<Data.IReport> {

            // create a new deferred object
            var deferred = this.$q.defer<Data.IReport>();

            this.dataService.reports.find(reportId).then((board: Data.IReport) => {

                // attach the board
                this.current.report = board;
                console.log('Loaded board: ' + board.title);
                deferred.resolve(this.current.report);

            }).catch(() => {

                deferred.reject();

            });

            return deferred.promise;
        }

        /**
         * Transforms the dataset for the chart
         * @param  {Data.IDatasetResult} results The dataset run result
         * @return {any}                         The chart data
         */
        public transformDatasetResult(item: Data.IReportItem): any {

            this.dataService.datasets.run(item.data.datasetId).then((data) => {
                item.result = {};
                item.result.labels = _.pluck(data, item.data.labelKey);
                item.result.values = [_.pluck(data, item.data.valueKey)];
                item.result.series = ['All'];

                if (item.data.isDate) {
                    let newValues = [];
                    for (let s of item.result.labels) {
                        newValues.push(s.substring(0, 10));
                    }
                    item.result.labels = newValues;
                }

                item.options = {};

                if (item.skipLabels) {

                    item.options.borderWidth = 1;
                    item.options.hoverBackgroundColor = 'rgba(255,99,132,0.4)';
                    item.options.hoverBorderColor = 'rgba(255,99,132,1)';
                    item.options.scales = {
                        xAxes: [{
                            display: true,
                            ticks: {
                                callback: function (dataLabel, index) {
                                    return index % item.skipLabels === 0 ? dataLabel : '';
                                }
                            }
                        }]
                    };
                }

                return item;
            });
        }
    }


    /**
     * Module Registration
     */
    angular
        .module('app.reporting')
        .service('reportService', ReportService);

}
