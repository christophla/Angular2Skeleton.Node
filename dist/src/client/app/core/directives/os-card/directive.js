"use strict";
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
exports.CardDirective = CardDirective;
//# sourceMappingURL=directive.js.map