/// <reference path="../data.module.ts" />
var Data;
(function (Data) {
    var DatasetRepository = (function () {
        function DatasetRepository(restangular) {
            this.restangular = restangular;
        }
        DatasetRepository.prototype.find = function (id) {
            return this.restangular.one('datasets', id).get();
        };
        DatasetRepository.prototype.getAll = function (ids) {
            return this.restangular.all('datasets').getList({ ids: ids });
        };
        DatasetRepository.prototype.run = function (id, parameters) {
            return this.restangular.one('datasets', id).customPOST({ parameters: parameters }, 'run');
        };
        DatasetRepository.$inject = ['Restangular'];
        return DatasetRepository;
    }());
    /**
     * Module Registration
     */
    angular
        .module('app.data')
        .service('datasetRepository', DatasetRepository);
})(Data || (Data = {}));
//# sourceMappingURL=dataset.repository.js.map