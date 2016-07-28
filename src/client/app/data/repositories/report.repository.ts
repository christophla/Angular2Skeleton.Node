/// <reference path="../data.module.ts" />

module Data {

    export interface IReport extends restangular.IElement {
        id: string;
        title: string;
        description: string;
        uri: string;
        items: Array<IReportItem>;
    }

    export interface IReportItem {
        colors?: Array<string>;
        data: IReportDataSettings;
        description: string;
        options?: any;
        position: Array<number>;
        result: any;
        size: Array<number>;
        skipLabels?: number;
        title: string;
        type: string;
        uri: string;


        fillColor: any;
        strokeColor: any;
        pointColor: any;
        pointStrokeColor: any;
        pointHighlightFill: any;
        pointHighlightStroke: any;
    }

    export interface IReportDataSettings {
        datasetId: string;
        isDate?: boolean;
        labelKey: string;
        valueKey: string;
    }

    export interface IReportLayout {
        serialized: boolean;
    }

    export interface IReportRepository {
        find(id: string): angular.IPromise<IReport>;
        getAll(): angular.IPromise<Array<IReport>>;
    }

    class ReportRepository implements IReportRepository {

        public static $inject = ['Restangular'];

        constructor(private restangular: restangular.IService) {
        }

        public find(id: string) {
            return this.restangular.one('reports', id).get();
        }

        public getAll() {
            return this.restangular.all('reports').getList();
        }

    }


    /**
     * Module Registration
     */
    angular
        .module('app.data')
        .service('reportRepository', ReportRepository);
}
