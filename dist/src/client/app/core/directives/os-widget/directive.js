"use strict";
// TODO: Convert to class and determine how to make scope persistent with transculsion
function WidgetController($scope, $element) {
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
exports.WidgetController = WidgetController;
WidgetController.$inject = ['$scope', '$element'];
class WidgetDirective {
    constructor() {
        this.scope = { flippable: '=?' };
        this.controller = 'OsWidgetController';
        this.restrict = 'E';
        this.transclude = true;
    }
    /**
     *  Generates the directive
    **/
    static factory() {
        var directive = () => new WidgetDirective();
        return directive;
    }
    compile(tElement) {
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
exports.WidgetDirective = WidgetDirective;
class WidgetFrontDirective {
    constructor() {
        this.restrict = 'E';
        this.require = '^osWidget';
        this.transclude = true;
    }
    /**
     *  Generates the directive
    **/
    static factory() {
        var directive = () => new WidgetFrontDirective();
        return directive;
    }
    compile(tElement) {
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
exports.WidgetFrontDirective = WidgetFrontDirective;
class WidgetBackDirective {
    constructor() {
        this.restrict = 'E';
        this.require = '^osWidget';
        this.transclude = true;
    }
    /**
     *  Generates the directive
    **/
    static factory() {
        var directive = () => new WidgetBackDirective();
        return directive;
    }
    compile(tElement) {
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
exports.WidgetBackDirective = WidgetBackDirective;
//# sourceMappingURL=directive.js.map