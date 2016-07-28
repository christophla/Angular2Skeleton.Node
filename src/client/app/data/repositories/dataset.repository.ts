/// <reference path="../data.module.ts" />

module Data {

    export interface IDatasetResult extends restangular.ICollection {

    }

    export interface IDataset {
        id: string;
        data: Array<string>;
        label: string;
        inputs: Array<IDatasetInput>;
    }

    export interface IDatasetInput {
        name: string;
        title: string;
        description: string;
        type: string;
        dataset: any;
        datasetId: string;
        datasetColumnTitle: string;
        datasetColumnValue: string;
        required: boolean;
        selected: string;
    }

    export interface IDatasetRepository {
        find(id: string): angular.IPromise<IDataset>;
        getAll(ids?: number[]): angular.IPromise<Array<IDataset>>;
        run(id: string, parameters?: Array<string>): angular.IPromise<IDatasetResult>;
    }

    class DatasetRepository implements IDatasetRepository {

        public static $inject = ['Restangular'];

        constructor(private restangular: restangular.IService) {
        }

        public find(id) {
            return this.restangular.one('datasets', id).get();
        }

        public getAll(ids) {
            return this.restangular.all('datasets').getList({ ids: ids });
        }

        public run(id, parameters) {
            return this.restangular.one('datasets', id).customPOST({ parameters: parameters }, 'run');
        }

    }


    /**
     * Module Registration
     */
    angular
        .module('app.data')
        .service('datasetRepository', DatasetRepository);
}
