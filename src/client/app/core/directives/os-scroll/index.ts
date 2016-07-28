
import {IOSConfiguration} from '../../config/index';
import {IUtils} from '../../services/utils';

/**
 * PerfectScrollbar support
 *
 * @interface IPerfectScrollbar
 */
interface IPerfectScrollbar {
    initialize(element: any, options?: any);
    update(element: any): void;
    destroy(element: any): void;
}

declare var PerfectScrollbar: IPerfectScrollbar;

/**
 * Scroll Configuration Settings
 */
export interface IScrollConfigSettings {
    wheelSpeed?: number;
    wheelPropagation?: boolean;
    swipePropagation?: boolean;
    minScrollbarLength?: number;
    maxScrollbarLength?: number;
    useBothWheelAxes?: boolean;
    useKeyboard?: boolean;
    suppressScrollX?: boolean;
    suppressScrollY?: boolean;
    scrollXMarginOffset?: number;
    scrollYMarginOffset?: number;
    stopPropagationOnClick?: boolean;
}

/**
 * Scroll Config Service
 */
export interface IScrollConfigService {
    getConfig(): IScrollConfigSettings;
}

/**
 * Scroll Config Provider
 */
export interface IScrollConfigProvider extends ng.IServiceProvider {
    config(configuration: IScrollConfigSettings): void;
}

/**
 * Scroll Config Service
 */
export class ScrollConfigService implements IScrollConfigService {

    constructor(private defaultConfiguration: IScrollConfigSettings) { }

    public getConfig() {
        return this.defaultConfiguration;
    }
}

/**
 * Scroll Config Provider
 */
export class ScrollConfigProvider implements IScrollConfigProvider {

    // Default configuration
    private defaultConfiguration: IScrollConfigSettings = {
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

    /**
    * Extend default configuration with the given one
    *
    * @param configuration The scroll config setttings
    */
    public config(configuration: IScrollConfigSettings) {
        this.defaultConfiguration = angular.extend({}, this.defaultConfiguration, configuration);
    }

    /**
    * Return service instance
    */
    public $get(): IScrollConfigService {
        return new ScrollConfigService(this.defaultConfiguration);
    }
}

/**
 * Scroll Directive
 */
export class ScrollDirective implements ng.IDirective {

    public restrict = 'AE';

    public static factory(): ng.IDirectiveFactory {

        var directive = (
            $timeout: ng.ITimeoutService,
            osScrollConfig: any,
            osUtils: any,
            osConfig: any
        ) =>
            new ScrollDirective($timeout, osScrollConfig, osUtils, osConfig);

        directive.$inject = ['$timeout', 'osScrollConfig', 'osUtils', 'osConfig'];

        return directive;
    }

    /**
     * Constructor
     * @param $timeout The timeout service
     * @param osScrollConfig The scroll configuration
     * @param osUtils The utils service
     * @param osConfig The app configuration
     */
    constructor(
        private $timeout: ng.ITimeoutService,
        private osScrollConfig: IScrollConfigService,
        private osUtils: IUtils,
        private osConfig: IOSConfiguration) {
    }


    public compile(templateElement: ng.IAugmentedJQuery) {

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