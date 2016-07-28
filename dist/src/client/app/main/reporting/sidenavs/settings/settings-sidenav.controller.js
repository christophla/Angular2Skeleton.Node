/// <reference path="../../reporting.module.ts" />
var Reporting;
(function (Reporting) {
    class SettingsSidenavController {
        constructor(reportService, $mdColorPalette) {
            this.reportService = reportService;
            this.board = reportService.current.report;
            this.palettes = $mdColorPalette;
            this.selectedMenu = 'Settings';
        }
        subscribe() {
            // this.board.subscribed = !this.board.subscribed;
            // this.boardService.hasChanges = true;
        }
    }
    SettingsSidenavController.$inject = ['reportService', '$mdColorPalette'];
    angular
        .module('app.reporting')
        .controller('SettingsSidenavController', SettingsSidenavController);
})(Reporting || (Reporting = {}));
//# sourceMappingURL=settings-sidenav.controller.js.map