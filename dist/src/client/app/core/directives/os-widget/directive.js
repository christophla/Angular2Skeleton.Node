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
var WidgetDirective = (function () {
    function WidgetDirective() {
        this.scope = { flippable: '=?' };
        this.controller = 'OsWidgetController';
        this.restrict = 'E';
        this.transclude = true;
    }
    /**
     *  Generates the directive
    **/
    WidgetDirective.factory = function () {
        var directive = function () { return new WidgetDirective(); };
        return directive;
    };
    WidgetDirective.prototype.compile = function (tElement) {
        tElement.addClass('os-widget');
        return function (scope, iElement, iAttrs, OsWidgetCtrl, transcludeFn) {
            // Custom transclusion
            transcludeFn(function (clone) {
                iElement.empty();
                iElement.append(clone);
            });
        };
    };
    return WidgetDirective;
}());
exports.WidgetDirective = WidgetDirective;
var WidgetFrontDirective = (function () {
    function WidgetFrontDirective() {
        this.restrict = 'E';
        this.require = '^osWidget';
        this.transclude = true;
    }
    /**
     *  Generates the directive
    **/
    WidgetFrontDirective.factory = function () {
        var directive = function () { return new WidgetFrontDirective(); };
        return directive;
    };
    WidgetFrontDirective.prototype.compile = function (tElement) {
        tElement.addClass('os-widget-front');
        return function (scope, iElement, iAttrs, OsWidgetCtrl, transcludeFn) {
            // Custom transclusion
            transcludeFn(function (clone) {
                iElement.empty();
                iElement.append(clone);
            });
            // Methods
            scope.flipWidget = OsWidgetCtrl.flip;
        };
    };
    return WidgetFrontDirective;
}());
exports.WidgetFrontDirective = WidgetFrontDirective;
var WidgetBackDirective = (function () {
    function WidgetBackDirective() {
        this.restrict = 'E';
        this.require = '^osWidget';
        this.transclude = true;
    }
    /**
     *  Generates the directive
    **/
    WidgetBackDirective.factory = function () {
        var directive = function () { return new WidgetBackDirective(); };
        return directive;
    };
    WidgetBackDirective.prototype.compile = function (tElement) {
        tElement.addClass('os-widget-back');
        return function (scope, iElement, iAttrs, OsWidgetCtrl, transcludeFn) {
            // Custom transclusion
            transcludeFn(function (clone) {
                iElement.empty();
                iElement.append(clone);
            });
            // Methods
            scope.flipWidget = OsWidgetCtrl.flip;
        };
    };
    return WidgetBackDirective;
}());
exports.WidgetBackDirective = WidgetBackDirective;
//# sourceMappingURL=directive.js.map