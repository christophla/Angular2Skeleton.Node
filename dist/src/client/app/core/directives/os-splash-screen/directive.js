"use strict";
/**
 * Spash screen directive
 */
class SplashScreenDirective {
    /**
     * Constructor
     * @param $animate  The angular animate service
     */
    constructor($animate) {
        this.$animate = $animate;
        this.restrict = 'E';
        this.link = (scope, instanceElement) => {
            var splashScreenRemoveEvent = scope.$on('osSplashScreen::remove', () => {
                this.$animate.leave(instanceElement).then(() => {
                    // De-register scope event
                    splashScreenRemoveEvent();
                    // Null-ify everything else
                    scope = instanceElement = null;
                });
            });
        };
        this.$animate = $animate;
    }
    /**
     *  Generates the directive
    **/
    static factory() {
        var directive = ($animate) => new SplashScreenDirective($animate);
        directive.$inject = ['$animate'];
        return directive;
    }
}
SplashScreenDirective.$inject = ['$animate'];
exports.SplashScreenDirective = SplashScreenDirective;
//# sourceMappingURL=directive.js.map