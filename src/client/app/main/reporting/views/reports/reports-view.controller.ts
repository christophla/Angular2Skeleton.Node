/// <reference path="../../reporting.module.ts" />

module Reporting {

    class ReportsViewController {

        public static $inject = [
            '$rootScope',
            '$scope',
            'dataService',
            'reportList'
        ];

        public reportList: Array<Data.IReport>;

        constructor(
            private $rootScope: angular.IRootScopeService,
            private $scope: angular.IScope,
            private dataService: Data.IDataService,
            reportList: Array<Data.IReport>) {

            this.reportList = reportList;
        }

    }

    /**
     * Module Registration
     */
    angular
        .module('app.reporting')
        .controller('ReportsViewController', ReportsViewController);

}
