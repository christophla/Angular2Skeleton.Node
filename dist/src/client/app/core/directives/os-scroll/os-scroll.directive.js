/// <reference path="../../core.module.ts" />
var Core;
(function (Core) {
    /**
     * Scroll Config Service
     */
    class ScrollConfigService {
        constructor(defaultConfiguration) {
            this.defaultConfiguration = defaultConfiguration;
        }
        getConfig() {
            return this.defaultConfiguration;
        }
    }
    /**
     * Scroll Config Provider
     */
    class ScrollConfigProvider {
        constructor() {
            // Default configuration
            this.defaultConfiguration = {
                maxScrollbarLength: null,
                minScrollbarLength: null,
                scrollXMarginOffset: 0,
                scrollYMarginOffset: 0,
                stopPropagationOnClick: true,
                suppressScrollX: false,
                suppressScrollY: false,
                swipePropagation: true,
                useBothWheelAxes: false,
                useKeyboard: true,
                wheelPropagation: false,
                wheelSpeed: 1
            };
        }
        /**
        * Extend default configuration with the given one
        *
        * @param configuration The scroll config setttings
        */
        config(configuration) {
            this.defaultConfiguration = angular.extend({}, this.defaultConfiguration, configuration);
        }
        /**
        * Return service instance
        */
        $get() {
            return new ScrollConfigService(this.defaultConfiguration);
        }
    }
    /**
     * Scroll Directive
     */
    class ScrollDirective {
        /**
         * Constructor
         * @param $timeout The timeout service
         * @param osScrollConfig The scroll configuration
         * @param osUtils The utils service
         * @param osConfig The app configuration
         */
        constructor($timeout, osScrollConfig, osUtils, osConfig) {
            this.$timeout = $timeout;
            this.osScrollConfig = osScrollConfig;
            this.osUtils = osUtils;
            this.osConfig = osConfig;
            this.restrict = 'AE';
        }
        static factory() {
            var directive = ($timeout, osScrollConfig, osUtils, osConfig) => new ScrollDirective($timeout, osScrollConfig, osUtils, osConfig);
            directive.$inject = ['$timeout', 'osScrollConfig', 'osUtils', 'osConfig'];
            return directive;
        }
        compile(templateElement) {
            // Do not replace scrollbars if
            // 'disableCustomScrollbars' config enabled
            if (this.osConfig.getConfig('disableCustomScrollbars')) {
                return undefined;
            }
            // Do not replace scrollbars on mobile devices
            // if 'disableCustomScrollbarsOnMobile' config enabled
            if (this.osConfig.getConfig('disableCustomScrollbarsOnMobile') && this.osUtils.isMobile()) {
                return undefined;
            }
            // Add class
            templateElement.addClass('os-scroll');
            return (scope, iElement, iAttrs) => {
                var options = {};
                // If options supplied, evaluate the given
                // value. This is because we don't want to
                // have an isolated scope but still be able
                // to use scope variables.
                // We don't want an isolated scope because
                // we should be able to use this everywhere
                // especially with other directives
                if (iAttrs.osScroll) {
                    options = scope.$eval(iAttrs.osScroll);
                }
                // Extend the given config with the ones from provider
                options = angular.extend({}, this.osScrollConfig.getConfig(), options);
                // Initialize the scrollbar
                this.$timeout(() => {
                    PerfectScrollbar.initialize(iElement[0], options);
                }, 0);
                /**
                 * Update the scrollbar
                 */
                function updateScrollbar() {
                    PerfectScrollbar.update(iElement[0]);
                }
                // Update the scrollbar on element mouseenter
                iElement.on('mouseenter', updateScrollbar);
                // Watch scrollHeight and update
                // the scrollbar if it changes
                scope.$watch(() => iElement.prop('scrollHeight'), (current, old) => {
                    if (angular.isUndefined(current) || angular.equals(current, old)) {
                        return;
                    }
                    updateScrollbar();
                });
                // Watch scrollWidth and update
                // the scrollbar if it changes
                scope.$watch(() => iElement.prop('scrollWidth'), (current, old) => {
                    if (angular.isUndefined(current) || angular.equals(current, old)) {
                        return;
                    }
                    updateScrollbar();
                });
                // Cleanup on destroy
                scope.$on('$destroy', () => {
                    iElement.off('mouseenter');
                    PerfectScrollbar.destroy(iElement[0]);
                });
            };
        }
    }
    /**
     * Module Registration
     */
    angular
        .module('os.core')
        .provider('osScrollConfig', () => new ScrollConfigProvider())
        .directive('osScroll', ScrollDirective.factory());
})(Core || (Core = {}));
//# sourceMappingURL=os-scroll.directive.js.map