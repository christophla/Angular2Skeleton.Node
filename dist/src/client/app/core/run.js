"use strict";
class RunBlock {
    constructor(osUtils, appThemeGenerator, osConfig) {
        /**
         * Generate extra classes based on registered themes so we
         * can use same colors with non-angular-material elements
         */
        appThemeGenerator.generate();
        /**
         * Disable md-ink-ripple effects on mobile
         * if 'disableMdInkRippleOnMobile' config enabled
         */
        if (osConfig.getConfig('disableMdInkRippleOnMobile') && osUtils.isMobile()) {
            var bodyEl = angular.element('body');
            bodyEl.attr('md-no-ink', 'true');
        }
        /**
         * Put isMobile() to the html as a class
         */
        if (osUtils.isMobile()) {
            angular.element('html').addClass('is-mobile');
        }
        /**
         * Put browser information to the html as a class
         */
        var browserInfo = osUtils.detectBrowser();
        if (browserInfo) {
            var htmlClass = browserInfo.browser + ' ' + browserInfo.version + ' ' + browserInfo.os;
            angular.element('html').addClass(htmlClass);
        }
    }
}
RunBlock.$inject = ['osUtils', 'appThemeGenerator', 'osConfig'];
exports.RunBlock = RunBlock;
//# sourceMappingURL=run.js.map