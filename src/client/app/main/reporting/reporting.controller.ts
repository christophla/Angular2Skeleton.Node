/// <reference path="reporting.module.ts" />

module Reporting {

    interface IReportingScope extends ng.IRootScopeService {
        currentReport: Data.IReport;
    }

    class ReportingController {

        public static $inject = [
            '$rootScope',
            '$scope',
            '$window',
            '$mdSidenav',
            'osCoreService',
            'osEventService',
            'dataService',
            'reportService',
            'reportList',
        ];

        public report: Data.IReport;
        public reportList: Array<Data.IReport>;
        public reportSelectorVisible = false;
        public currentView = 'report';
        public fullscreenCtrl: any;

        /**
         * Creates a new instance of the dashboard controller
         *
         * @param $window
         * @param $mdSidenav
         * @param core
         * @param cardFilters
         * @param reportList
         */
        constructor(
            private $rootScope: IReportingScope,
            private $scope: any,
            private $window: ng.IWindowService,
            private $mdSidenav: ng.material.ISidenavService,
            private core: Core.ICoreService,
            private events: Core.IEventService,
            private dataService: Data.IDataService,
            private reportService: IReportService,
            reportList: Array<Data.IReport>
        ) {
            this.reportList = reportList;
            this.report = reportService.current.report;

            // IE list-content max-height hack
            if (angular.element('html').hasClass('explorer')) {

                // Calculate the height for the first time
                this.calculateListContentHeight();

                // Attach calculateListContentHeight function to window resize
                $window.onresize = () => {
                    this.calculateListContentHeight();
                };
            }

        }


        /**
         * Calculate the list-content height
         * IE ONLY
         */
        public calculateListContentHeight() {

            // Get the required heights for calculations
            var listWrapperEl = angular.element('#board .list-wrapper').first(),
                listWrapperElHeight = listWrapperEl.height(),
                listHeaderElHeight = listWrapperEl.find('.list-header').height(),
                listFooterElHeight = listWrapperEl.find('.list-footer').height();

            // Calculate the max height
            var maxHeight = listWrapperElHeight - listHeaderElHeight - listFooterElHeight;

            // Add the max height
            angular.element('#board .list-content').css({ 'max-height': maxHeight });
        }


        /**
         * Update Board Uri
         */
        public updateReportUri() {

            let uri = encodeURIComponent(this.report.title).replace(/%20/g, '-').toLowerCase();
            this.report.uri = uri;

            if (this.reportList.getById(this.report.id)) {

                this.reportList.getById(this.report.id).title = this.report.title;
                this.reportList.getById(this.report.id).uri = this.report.uri = uri;
                // this.boardService.hasChanges = true;
            }
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        public toggleSidenav(sidenavId) {
            this.$mdSidenav(sidenavId).toggle();
        }


        /**
         * Toggles fullscreen for the report
         */
        public toggleFullscreen() {
            this.$scope.fullscreenCtrl.toggleFullscreen();
        }

    }

    /**
     * Module Registration
     */
    angular
        .module('app.reporting')
        .controller('ReportingController', ReportingController);

}
