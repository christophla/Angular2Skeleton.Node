/// <reference path="../../../../reporting.module.ts" />
module Reporting {

    class ColorMenuController {

        public static $inject = [
            '$mdColorPalette',
            'reportService'
        ];

        public board: Data.IReport;
        public palettes: angular.material.IPalette;

        constructor(
            $mdColorPalette: angular.material.IPalette,
            private boardService: IReportService
        ) {
            this.board = boardService.current.report;
            this.palettes = $mdColorPalette;
        }

        public setPalette(color: string) {
            // this.board.color = color;
            // this.boardService.hasChanges = true;
        }
    }


    angular
        .module('app.reporting')
        .controller('ColorMenuController', ColorMenuController);

}
