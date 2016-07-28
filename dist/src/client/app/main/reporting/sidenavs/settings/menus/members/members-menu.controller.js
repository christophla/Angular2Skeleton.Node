/// <reference path="../../../../reporting.module.ts" />
var Reporting;
(function (Reporting) {
    class MembersMenuController {
        constructor($document, $mdDialog, reportService) {
            this.$document = $document;
            this.$mdDialog = $mdDialog;
            this.reportService = reportService;
            this.board = reportService.current.report;
            this.newMemberSearchInput = '';
        }
        /**
         * Add New Member
         */
        addNewMember() {
            // this.boardService.hasChanges = true;
        }
        /**
         * Remove member
         *
         * @param ev
         * @param memberId
         */
        removeMember(ev, memberId) {
            var confirm = this.$mdDialog.confirm({
                ariaLabel: 'remove member',
                cancel: 'Cancel',
                clickOutsideToClose: true,
                escapeToClose: true,
                ok: 'Remove',
                parent: this.$document.find('#dashboard'),
                targetEvent: ev,
                textContent: 'Are you sure want to remove member?',
                title: 'Remove Member'
            });
            this.$mdDialog.show(confirm).then(function () {
                var arr = this.board.members;
                arr.splice(arr.indexOf(arr.getById(memberId)), 1);
                angular.forEach(this.board.cards, function (card) {
                    if (card.idMembers && card.idMembers.indexOf(memberId) > -1) {
                        card.idMembers.splice(card.idMembers.indexOf(memberId), 1);
                    }
                });
                this.boardService.hasChanges = true;
            }, function () {
                // Canceled
            });
        }
    }
    MembersMenuController.$inject = [
        '$document',
        '$mdDialog',
        'reportService'
    ];
    angular
        .module('app.reporting')
        .controller('MembersMenuController', MembersMenuController);
})(Reporting || (Reporting = {}));
//# sourceMappingURL=members-menu.controller.js.map