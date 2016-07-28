/// <reference path="../../reporting.module.ts" />
var Reporting;
(function (Reporting) {
    class ReportViewController {
        constructor($rootScope, $scope, events, dataService, reportService, reportList) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.events = events;
            this.dataService = dataService;
            this.reportService = reportService;
            this.type = 'bar';
            this.reportList = reportList;
            this.report = reportService.current.report;
            this.items = this.report.items;
            angular.forEach(this.report.items, (item) => {
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
    ReportViewController.$inject = [
        '$rootScope',
        '$scope',
        'osEventService',
        'dataService',
        'reportService',
        'reportList'
    ];
    angular
        .module('app.reporting')
        .controller('ReportViewController', ReportViewController);
})(Reporting || (Reporting = {}));
//# sourceMappingURL=report-view.controller.js.map