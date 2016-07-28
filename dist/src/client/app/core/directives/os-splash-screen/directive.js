"use strict";
/**
 * Spash screen directive
 */
var SplashScreenDirective = (function () {
    /**
     * Constructor
     * @param $animate  The angular animate service
     */
    function SplashScreenDirective($animate) {
        var _this = this;
        this.$animate = $animate;
        this.restrict = 'E';
        this.link = function (scope, instanceElement) {
            var splashScreenRemoveEvent = scope.$on('osSplashScreen::remove', function () {
                _this.$animate.leave(instanceElement).then(function () {
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
    SplashScreenDirective.factory = function () {
        var directive = function ($animate) { return new SplashScreenDirective($animate); };
        directive.$inject = ['$animate'];
        return directive;
    };
    SplashScreenDirective.$inject = ['$animate'];
    return SplashScreenDirective;
}());
exports.SplashScreenDirective = SplashScreenDirective;
//# sourceMappingURL=directive.js.map