/// <reference path="../../reporting.module.ts" />
var Reporting;
(function (Reporting) {
    class FiltersSidenavController {
        constructor($rootScope, $scope, $mdColorPalette, dataService, reportService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$mdColorPalette = $mdColorPalette;
            this.dataService = dataService;
            this.reportService = reportService;
            this.board = reportService.current.report;
            this.dataset = reportService.current.dataset;
            this.startDate = '2016-01-01T00:00:00.000Z';
            this.endDate = '2016-01-31T00:00:00.000Z';
            this.startTime = '08:30 am';
            this.endTime = '03:30 pm';
            // behaviors
            this.dataService.datasets.run('7').then((data) => {
                this.behaviors = data;
            });
            // discipline
            this.dataService.datasets.run('8').then((data) => {
                this.disciplines = data;
            });
            // grade level
            this.dataService.datasets.run('9').then((data) => {
                this.gradelevels = data;
            });
            // locations
            this.dataService.datasets.run('6').then((data) => {
                this.locations = data;
            });
            // for (var input of this.dataset.inputs) {
            //     input.dataset = [];
            //     // input.dataset = [{
            //     //     title: 'All',
            //     //     value: null
            //     // }];
            //     this.dataService.datasets.run(input.datasetId).then((result) => {
            //         for (var set of result) {
            //             input.dataset.push({
            //                 title: set[input.datasetColumnTitle],
            //                 value: set[input.datasetColumnValue]
            //             });
            //         }
            //         input.selected = input.dataset[0].value;
            //     });
            // }
        }
        change(input) {
            this.$rootScope.update = input.selected;
        }
    }
    FiltersSidenavController.$inject = [
        '$rootScope',
        '$scope',
        '$mdColorPalette',
        'dataService',
        'reportService'
    ];
    angular
        .module('app.reporting')
        .controller('FiltersSidenavController', FiltersSidenavController);
})(Reporting || (Reporting = {}));
//# sourceMappingURL=filters-sidenav.controller.js.map