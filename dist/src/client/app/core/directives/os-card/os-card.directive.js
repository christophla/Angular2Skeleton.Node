/// <reference path="../../core.module.ts" />
var Core;
(function (Core) {
    /**
     * Card Directive
     */
    class CardDirective {
        constructor() {
            this.restrict = 'E';
            this.template = '<div class="os-card-content-wrapper" ng-include="templatePath" onload="cardTemplateLoaded()"></div>';
            this.scope = {
                card: '=ngModel',
                templatePath: '=template'
            };
        }
        compile(templateElement) {
            // Add class
            templateElement.addClass('os-card');
            return (scope, instanceElement) => {
                /**
                 * Emit cardTemplateLoaded event
                 */
                function cardTemplateLoaded() {
                    scope.$emit('osCard::cardTemplateLoaded', instanceElement);
                }
                // Methods
                scope.cardTemplateLoaded = cardTemplateLoaded;
            };
        }
    }
    Core.CardDirective = CardDirective;
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .directive('osCard', () => new CardDirective());
})(Core || (Core = {}));
//# sourceMappingURL=os-card.directive.js.map