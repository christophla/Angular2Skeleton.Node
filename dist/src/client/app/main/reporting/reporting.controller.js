/// <reference path="reporting.module.ts" />
var Reporting;
(function (Reporting) {
    class ReportingController {
        /**
         * Creates a new instance of the dashboard controller
         *
         * @param $window
         * @param $mdSidenav
         * @param core
         * @param cardFilters
         * @param reportList
         */
        constructor($rootScope, $scope, $window, $mdSidenav, core, events, dataService, reportService, reportList) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$window = $window;
            this.$mdSidenav = $mdSidenav;
            this.core = core;
            this.events = events;
            this.dataService = dataService;
            this.reportService = reportService;
            this.reportSelectorVisible = false;
            this.currentView = 'report';
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
        calculateListContentHeight() {
            // Get the required heights for calculations
            var listWrapperEl = angular.element('#board .list-wrapper').first(), listWrapperElHeight = listWrapperEl.height(), listHeaderElHeight = listWrapperEl.find('.list-header').height(), listFooterElHeight = listWrapperEl.find('.list-footer').height();
            // Calculate the max height
            var maxHeight = listWrapperElHeight - listHeaderElHeight - listFooterElHeight;
            // Add the max height
            angular.element('#board .list-content').css({ 'max-height': maxHeight });
        }
        /**
         * Update Board Uri
         */
        updateReportUri() {
            let uri = encodeURIComponent(this.report.title).replace(/%20/g, '-').toLowerCase();
            this.report.uri = uri;
            if (this.reportList.getById(this.report.id)) {
                this.reportList.getById(this.report.id).title = this.report.title;
                this.reportList.getById(this.report.id).uri = this.report.uri = uri;
            }
        }
        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        toggleSidenav(sidenavId) {
            this.$mdSidenav(sidenavId).toggle();
        }
        /**
         * Toggles fullscreen for the report
         */
        toggleFullscreen() {
            this.$scope.fullscreenCtrl.toggleFullscreen();
        }
    }
    ReportingController.$inject = [
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
    /**
     * Module Registration
     */
    angular
        .module('app.reporting')
        .controller('ReportingController', ReportingController);
})(Reporting || (Reporting = {}));
//# sourceMappingURL=reporting.controller.js.map