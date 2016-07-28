/// <reference path="../data.module.ts" />
var Data;
(function (Data) {
    var ReportRepository = (function () {
        function ReportRepository(restangular) {
            this.restangular = restangular;
        }
        ReportRepository.prototype.find = function (id) {
            return this.restangular.one('reports', id).get();
        };
        ReportRepository.prototype.getAll = function () {
            return this.restangular.all('reports').getList();
        };
        ReportRepository.$inject = ['Restangular'];
        return ReportRepository;
    }());
    /**
     * Module Registration
     */
    angular
        .module('app.data')
        .service('reportRepository', ReportRepository);
})(Data || (Data = {}));
//# sourceMappingURL=report.repository.js.map