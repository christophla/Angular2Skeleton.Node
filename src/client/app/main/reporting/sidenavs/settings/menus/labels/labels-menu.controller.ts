/// <reference path="../../../../reporting.module.ts" />
module Reporting {

    class LabelsMenuController {

        public static $inject = [
            '$document',
            '$mdColorPalette',
            '$mdDialog',
            'osUtils',
            'appThemeGenerator',
            'reportService'
        ];

        public board: Data.IReport;
        // public labels: Array<Data.IDashboardLabel>;
        public palettes: angular.material.IPalette;
        public hue = 500;
        public newLabelColor: string;
        public newLabelTitle: string;

        constructor(
            private $document: angular.IDocumentService,
            private $mdColorPalette: angular.material.IPalette,
            private $mdDialog: any,
            private utils: Core.IUtils,
            private generator: Core.IAppThemeGenerator,
            private reportService: IReportService
        ) {
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

        public rgba(color, _contrastLevel?: number) {
            this.generator.rgba(color, _contrastLevel);
        }

        /**
         * Remove label
         *
         * @param ev
         * @param labelId
         */
        public removeLabel(ev, labelId) {
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

            this.$mdDialog.show(confirm).then(function() {
                var arr = this.board.labels;
                arr.splice(arr.indexOf(arr.getById(labelId)), 1);

                angular.forEach(this.board.cards, function(card) {
                    if (card.idLabels && card.idLabels.indexOf(labelId) > -1) {
                        card.idLabels.splice(card.idLabels.indexOf(labelId), 1);
                    }
                });
                this.boardService.hasChanges = true;
            }, function() {
                // Canceled
            });
        }
    }


    angular
        .module('app.reporting')
        .controller('LabelsMenuController', LabelsMenuController);
}
