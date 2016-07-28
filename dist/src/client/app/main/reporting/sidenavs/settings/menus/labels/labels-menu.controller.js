/// <reference path="../../../../reporting.module.ts" />
var Reporting;
(function (Reporting) {
    class LabelsMenuController {
        constructor($document, $mdColorPalette, $mdDialog, utils, generator, reportService) {
            this.$document = $document;
            this.$mdColorPalette = $mdColorPalette;
            this.$mdDialog = $mdDialog;
            this.utils = utils;
            this.generator = generator;
            this.reportService = reportService;
            this.hue = 500;
            this.board = reportService.current.report;
            // this.labels = boardService.current.labels;
            this.newLabelColor = 'red';
            this.newLabelTitle = '';
            this.palettes = $mdColorPalette;
        }
        /**
         * Add New Label
         */
        // public addNewLabel() {
        //
        //     this.labels.push(<any>{
        //         color: this.newLabelColor,
        //         dashboardId: this.board.id,
        //         id: this.utils.guidGenerator(),
        //         title: this.newLabelTitle
        //     });
        //
        //     this.newLabelTitle = '';
        //     this.boardService.hasChanges = true;
        // }
        rgba(color, _contrastLevel) {
            this.generator.rgba(color, _contrastLevel);
        }
        /**
         * Remove label
         *
         * @param ev
         * @param labelId
         */
        removeLabel(ev, labelId) {
            var confirm = this.$mdDialog.confirm({
                ariaLabel: 'remove label',
                cancel: 'Cancel',
                clickOutsideToClose: true,
                escapeToClose: true,
                ok: 'Remove',
                parent: this.$document.find('#dashboard'),
                targetEvent: ev,
                textContent: 'Are you sure want to remove label?',
                title: 'Remove Label'
            });
            this.$mdDialog.show(confirm).then(function () {
                var arr = this.board.labels;
                arr.splice(arr.indexOf(arr.getById(labelId)), 1);
                angular.forEach(this.board.cards, function (card) {
                    if (card.idLabels && card.idLabels.indexOf(labelId) > -1) {
                        card.idLabels.splice(card.idLabels.indexOf(labelId), 1);
                    }
                });
                this.boardService.hasChanges = true;
            }, function () {
                // Canceled
            });
        }
    }
    LabelsMenuController.$inject = [
        '$document',
        '$mdColorPalette',
        '$mdDialog',
        'osUtils',
        'appThemeGenerator',
        'reportService'
    ];
    angular
        .module('app.reporting')
        .controller('LabelsMenuController', LabelsMenuController);
})(Reporting || (Reporting = {}));
//# sourceMappingURL=labels-menu.controller.js.map