/// <reference path="../data.module.ts" />
var Data;
(function (Data) {
    class DatasetRepository {
        constructor(restangular) {
            this.restangular = restangular;
        }
        find(id) {
            return this.restangular.one('datasets', id).get();
        }
        getAll(ids) {
            return this.restangular.all('datasets').getList({ ids: ids });
        }
        run(id, parameters) {
            return this.restangular.one('datasets', id).customPOST({ parameters: parameters }, 'run');
        }
    }
    DatasetRepository.$inject = ['Restangular'];
    /**
     * Module Registration
     */
    angular
        .module('app.data')
        .service('datasetRepository', DatasetRepository);
})(Data || (Data = {}));
//# sourceMappingURL=dataset.repository.js.map