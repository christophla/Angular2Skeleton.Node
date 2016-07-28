
/**
 * Care Directive Scope
 */
interface ICardDirective extends ng.IScope {
    templatePath: string;
    card: string;
    cardTemplateLoaded: Function;
}


/**
 * Card Directive
 */
export class CardDirective implements ng.IDirective {

    public restrict = 'E';
    public template = '<div class="os-card-content-wrapper" ng-include="templatePath" onload="cardTemplateLoaded()"></div>';
    public scope = {
        card: '=ngModel',
        templatePath: '=template'
    };

    public compile(templateElement: ng.IAugmentedJQuery) {

        // Add class
        templateElement.addClass('os-card');

        return (scope: any, instanceElement: ng.IAugmentedJQuery) => {

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