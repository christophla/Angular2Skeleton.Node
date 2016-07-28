/// <reference path="../../reporting.module.ts" />
var Reporting;
(function (Reporting) {
    class ReportsViewController {
        constructor($rootScope, $scope, dataService, reportList) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.dataService = dataService;
            this.reportList = reportList;
        }
    }
    ReportsViewController.$inject = [
        '$rootScope',
        '$scope',
        'dataService',
        'reportList'
    ];
    /**
     * Module Registration
     */
    angular
        .module('app.reporting')
        .controller('ReportsViewController', ReportsViewController);
})(Reporting || (Reporting = {}));
//# sourceMappingURL=reports-view.controller.js.map