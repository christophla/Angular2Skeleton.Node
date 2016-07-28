/// <reference path="../../reporting.module.ts" />
module Reporting {

    class SettingsSidenavController {

        public static $inject = ['reportService', '$mdColorPalette'];

        public board: Data.IReport;
        public palettes: angular.material.IPalette;
        public selectedMenu: string;

        constructor(
            private reportService: IReportService,
            $mdColorPalette: angular.material.IPalette
        ) {
            this.board = reportService.current.report;
            this.palettes = $mdColorPalette;
            this.selectedMenu = 'Settings';
        }

        public subscribe() {
            // this.board.subscribed = !this.board.subscribed;
            // this.boardService.hasChanges = true;
        }
    }


    angular
        .module('app.reporting')
        .controller('SettingsSidenavController', SettingsSidenavController);
}
