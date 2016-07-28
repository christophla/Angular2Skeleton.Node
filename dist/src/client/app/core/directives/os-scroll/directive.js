"use strict";
/**
 * Scroll Config Service
 */
var ScrollConfigService = (function () {
    function ScrollConfigService(defaultConfiguration) {
        this.defaultConfiguration = defaultConfiguration;
    }
    ScrollConfigService.prototype.getConfig = function () {
        return this.defaultConfiguration;
    };
    return ScrollConfigService;
}());
exports.ScrollConfigService = ScrollConfigService;
/**
 * Scroll Config Provider
 */
var ScrollConfigProvider = (function () {
    function ScrollConfigProvider() {
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
    ScrollConfigProvider.prototype.config = function (configuration) {
        this.defaultConfiguration = angular.extend({}, this.defaultConfiguration, configuration);
    };
    /**
    * Return service instance
    */
    ScrollConfigProvider.prototype.$get = function () {
        return new ScrollConfigService(this.defaultConfiguration);
    };
    return ScrollConfigProvider;
}());
exports.ScrollConfigProvider = ScrollConfigProvider;
/**
 * Scroll Directive
 */
var ScrollDirective = (function () {
    /**
     * Constructor
     * @param $timeout The timeout service
     * @param osScrollConfig The scroll configuration
     * @param osUtils The utils service
     * @param osConfig The app configuration
     */
    function ScrollDirective($timeout, osScrollConfig, osUtils, osConfig) {
        this.$timeout = $timeout;
        this.osScrollConfig = osScrollConfig;
        this.osUtils = osUtils;
        this.osConfig = osConfig;
        this.restrict = 'AE';
    }
    ScrollDirective.factory = function () {
        var directive = function ($timeout, osScrollConfig, osUtils, osConfig) {
            return new ScrollDirective($timeout, osScrollConfig, osUtils, osConfig);
        };
        directive.$inject = ['$timeout', 'osScrollConfig', 'osUtils', 'osConfig'];
        return directive;
    };
    ScrollDirective.prototype.compile = function (templateElement) {
        var _this = this;
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
        return function (scope, iElement, iAttrs) {
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
            options = angular.extend({}, _this.osScrollConfig.getConfig(), options);
            // Initialize the scrollbar
            _this.$timeout(function () {
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
            scope.$watch(function () { return iElement.prop('scrollHeight'); }, function (current, old) {
                if (angular.isUndefined(current) || angular.equals(current, old)) {
                    return;
                }
                updateScrollbar();
            });
            // Watch scrollWidth and update
            // the scrollbar if it changes
            scope.$watch(function () { return iElement.prop('scrollWidth'); }, function (current, old) {
                if (angular.isUndefined(current) || angular.equals(current, old)) {
                    return;
                }
                updateScrollbar();
            });
            // Cleanup on destroy
            scope.$on('$destroy', function () {
                iElement.off('mouseenter');
                PerfectScrollbar.destroy(iElement[0]);
            });
        };
    };
    return ScrollDirective;
}());
exports.ScrollDirective = ScrollDirective;
//# sourceMappingURL=directive.js.map