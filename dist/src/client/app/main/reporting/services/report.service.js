/// <reference path='../reporting.module.ts' />
var Reporting;
(function (Reporting) {
    class ReportService {
        constructor($q, coreService, dataService) {
            this.$q = $q;
            this.coreService = coreService;
            this.dataService = dataService;
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
        getReportData(reportId) {
            // create a new deferred object
            var deferred = this.$q.defer();
            this.dataService.reports.find(reportId).then((board) => {
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
        transformDatasetResult(item) {
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
    ReportService.$inject = ['$q', 'osCoreService', 'dataService'];
    Reporting.ReportService = ReportService;
    /**
     * Module Registration
     */
    angular
        .module('app.reporting')
        .service('reportService', ReportService);
})(Reporting || (Reporting = {}));
//# sourceMappingURL=report.service.js.map