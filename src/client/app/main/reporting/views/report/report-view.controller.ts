/// <reference path="../../reporting.module.ts" />
module Reporting {

    class ReportViewController {

        public static $inject = [
            '$rootScope',
            '$scope',
            'osEventService',
            'dataService',
            'reportService',
            'reportList'
        ];

        public data: any;
        public dataset: Data.IDataset;
        public datasetOverride: any;
        public fullscreenCtrl: any;
        public items: any;
        public labels: any;
        public options: any;
        public report: Data.IReport;
        public reportList: Array<Data.IReport>;
        public type: any = 'bar';

        constructor(
            private $rootScope: any,
            private $scope: any,
            private events: Core.IEventService,
            private dataService: Data.IDataService,
            private reportService: IReportService,
            reportList: Array<Data.IReport>
        ) {

            this.reportList = reportList;
            this.report = reportService.current.report;
            this.items = this.report.items;

            angular.forEach(this.report.items, (item: Data.IReportItem) => {
                this.reportService.transformDatasetResult(item);
            });

            // toggle fullscreen

            this.events.on('report-fullscreen', () => {
                this.$scope.fullscreenCtrl.toggleFullscreen();
            }, true);

            $scope.options = {
                scale: 1,
                scales: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            callback: function (dataLabel, index) {
                                return index % 2 === 0 ? dataLabel : '';
                            }
                        }
                    }],
                    yAxes: [{
                        beginAtZero: false,
                        display: true
                    }]
                },
                stacked: false
            };

            this.datasetOverride = [{
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',

            }];

        }

    }

    angular
        .module('app.reporting')
        .controller('ReportViewController', ReportViewController);
}
