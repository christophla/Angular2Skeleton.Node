/// <reference path="../../core.module.ts" />
var Core;
(function (Core) {
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
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .controller('OsWidgetController', WidgetController)
        .directive('osWidget', WidgetDirective.factory())
        .directive('osWidgetFront', WidgetFrontDirective.factory())
        .directive('osWidgetBack', WidgetBackDirective.factory());
})(Core || (Core = {}));
//# sourceMappingURL=os-widget.directive.js.map