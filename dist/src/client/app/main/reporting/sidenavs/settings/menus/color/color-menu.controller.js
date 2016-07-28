/// <reference path="../../../../reporting.module.ts" />
var Reporting;
(function (Reporting) {
    class ColorMenuController {
        constructor($mdColorPalette, boardService) {
            this.boardService = boardService;
            this.board = boardService.current.report;
            this.palettes = $mdColorPalette;
        }
        setPalette(color) {
            // this.board.color = color;
            // this.boardService.hasChanges = true;
        }
    }
    ColorMenuController.$inject = [
        '$mdColorPalette',
        'reportService'
    ];
    angular
        .module('app.reporting')
        .controller('ColorMenuController', ColorMenuController);
})(Reporting || (Reporting = {}));
//# sourceMappingURL=color-menu.controller.js.map