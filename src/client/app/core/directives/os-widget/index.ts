
// TODO: Convert to class and determine how to make scope persistent with transculsion
export function WidgetController($scope: any, $element: any) {
    var vm = this;

    // Data
    vm.flipped = false;

    // Methods
    vm.flip = flip;

    //////////

    /**
     * Flip the widget
     */
    function flip() {
        if (!isFlippable()) {
            return;
        }

        // Toggle flipped status
        vm.flipped = !vm.flipped;

        // Toggle the 'flipped' class
        $element.toggleClass('flipped', vm.flipped);
    }

    /**
     * Check if widget is flippable
     *
     * @returns {boolean}
     */
    function isFlippable() {
        return (angular.isDefined($scope.flippable) && $scope.flippable === true);
    }
}
WidgetController.$inject = ['$scope', '$element'];

export class WidgetDirective implements ng.IDirective {

    public controller: string;
    public restrict: string;
    public scope = { flippable: '=?' };
    public transclude: boolean;

    /**
     *  Generates the directive
    **/
    public static factory(): ng.IDirectiveFactory {
        var directive = () => new WidgetDirective();
        return directive;
    }

    constructor() {
        this.controller = 'OsWidgetController';
        this.restrict = 'E';
        this.transclude = true;
    }

    public compile(tElement: any) {

        tElement.addClass('os-widget');

        return (scope, iElement, iAttrs, OsWidgetCtrl, transcludeFn) => {

            // Custom transclusion
            transcludeFn(clone => {
                iElement.empty();
                iElement.append(clone);
            });

        };
    }
}

export class WidgetFrontDirective implements ng.IDirective {

    public restrict: string;
    public require: string;
    public transclude: boolean;


    /**
     *  Generates the directive
    **/
    public static factory(): ng.IDirectiveFactory {
        var directive = () => new WidgetFrontDirective();
        return directive;
    }

    constructor() {
        this.restrict = 'E';
        this.require = '^osWidget';
        this.transclude = true;
    }

    public compile(tElement: any) {

        tElement.addClass('os-widget-front');

        return (scope, iElement, iAttrs, OsWidgetCtrl, transcludeFn) => {

            // Custom transclusion
            transcludeFn(clone => {
                iElement.empty();
                iElement.append(clone);
            });

            // Methods
            scope.flipWidget = OsWidgetCtrl.flip;
        };
    }
}

export class WidgetBackDirective implements ng.IDirective {

    public restrict: string;
    public require: string;
    public transclude: boolean;

    /**
     *  Generates the directive
    **/
    public static factory(): ng.IDirectiveFactory {
        var directive = () => new WidgetBackDirective();
        return directive;
    }

    constructor() {
        this.restrict = 'E';
        this.require = '^osWidget';
        this.transclude = true;
    }

    public compile(tElement: any) {

        tElement.addClass('os-widget-back');

        return (scope, iElement, iAttrs, OsWidgetCtrl, transcludeFn) => {
            // Custom transclusion
            transcludeFn(clone => {
                iElement.empty();
                iElement.append(clone);
            });

            // Methods
            scope.flipWidget = OsWidgetCtrl.flip;
        };
    }
}
