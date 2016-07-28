"use strict";
/**
 * Card Directive
 */
var CardDirective = (function () {
    function CardDirective() {
        this.restrict = 'E';
        this.template = '<div class="os-card-content-wrapper" ng-include="templatePath" onload="cardTemplateLoaded()"></div>';
        this.scope = {
            card: '=ngModel',
            templatePath: '=template'
        };
    }
    CardDirective.prototype.compile = function (templateElement) {
        // Add class
        templateElement.addClass('os-card');
        return function (scope, instanceElement) {
            /**
             * Emit cardTemplateLoaded event
             */
            function cardTemplateLoaded() {
                scope.$emit('osCard::cardTemplateLoaded', instanceElement);
            }
            // Methods
            scope.cardTemplateLoaded = cardTemplateLoaded;
        };
    };
    return CardDirective;
}());
exports.CardDirective = CardDirective;
//# sourceMappingURL=directive.js.map