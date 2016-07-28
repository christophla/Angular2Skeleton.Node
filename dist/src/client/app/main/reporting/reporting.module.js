/// <reference path="../../../../../typings/index.d.ts" />
// add getById fuunction to Array
Array.prototype.getById = function (value) {
    return this.filter(x => (x.id === value))[0];
};
/**
 * Dashboard module
 */
var Reporting;
(function (Reporting) {
    /**
     * Configures the reporting module
     *
     * @param osNavigationServiceProvider
     * @param $stateProvider
     */
    function config(osNavigationServiceProvider, $translatePartialLoaderProvider, $stateProvider) {
        // State
        $stateProvider
            .state('app.reporting', {
            abstract: true,
            data: {
                bodyClass: 'report',
                roles: ['user']
            },
            resolve: {
                reportList: ['dataService', (data) => { return data.reports.getAll(); }]
            },
            url: '/reporting'
        })
            .state('app.reporting.reports', {
            url: '/reports',
            views: {
                'content@app': {
                    controller: 'ReportsViewController as vm',
                    templateUrl: 'app/main/reporting/views/reports/reports-view.html'
                }
            }
        })
            .state('app.reporting.reports.report', {
            resolve: {
                boardData: ['$stateParams', 'reportService',
                        ($stateParams, reportService) => {
                        return reportService.getReportData($stateParams.id);
                    }]
            },
            url: '/:id/:uri',
            views: {
                'content@app': {
                    controller: 'ReportingController as vm',
                    templateUrl: 'app/main/reporting/reporting.html'
                },
                'dashboardContent@app.reporting.reports.report': {
                    controller: 'ReportViewController as vm',
                    templateUrl: 'app/main/reporting/views/report/report-view.html'
                }
            }
        });
        // Translation
        $translatePartialLoaderProvider.addPart('app/main/reporting');
        // Navigation
        osNavigationServiceProvider.saveItem('dashboard', {
            icon: 'icon-chart-bar',
            state: 'app.reporting.reports',
            title: 'Reports',
            weight: 1
        });
    }
    config.$inject = [
        'osNavigationServiceProvider',
        '$translatePartialLoaderProvider',
        '$stateProvider'
    ];
    /**
     * Module Registration
     */
    angular
        .module('app.reporting', ['gridster', 'angularScreenfull'])
        .config(config);
})(Reporting || (Reporting = {}));
//# sourceMappingURL=reporting.module.js.map