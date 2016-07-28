/**
 * Random Class Directive Scope
 */
export interface IRandomClassDirectiveScope extends ng.IScope {
    osRandomClass: string;
}


/**
 * Random Class Directive
 */
export class RandomClassDirective implements ng.IDirective {

    public restrict = 'A';
    public scope = {
        osRandomClass: '='
    };

    public link = (scope: IRandomClassDirectiveScope, instanceElement: ng.IAugmentedJQuery) => {
        var randomClass = scope.osRandomClass[Math.floor(Math.random() * (scope.osRandomClass.length))];
        instanceElement.addClass(randomClass);

    }
}
