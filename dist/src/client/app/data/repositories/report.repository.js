/// <reference path="../data.module.ts" />
var Data;
(function (Data) {
    class ReportRepository {
        constructor(restangular) {
            this.restangular = restangular;
        }
        find(id) {
            return this.restangular.one('reports', id).get();
        }
        getAll() {
            return this.restangular.all('reports').getList();
        }
    }
    ReportRepository.$inject = ['Restangular'];
    /**
     * Module Registration
     */
    angular
        .module('app.data')
        .service('reportRepository', ReportRepository);
})(Data || (Data = {}));
//# sourceMappingURL=report.repository.js.map