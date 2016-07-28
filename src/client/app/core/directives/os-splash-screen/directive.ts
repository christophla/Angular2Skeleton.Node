
/**
 * Spash screen directive
 */
export class SplashScreenDirective implements ng.IDirective {

    public static $inject = ['$animate'];
    public restrict = 'E';

    /**
     *  Generates the directive
    **/
    public static factory(): ng.IDirectiveFactory {
        var directive = ($animate: ng.animate.IAnimateService) => new SplashScreenDirective($animate);
        directive.$inject = ['$animate'];
        return directive;
    }

    /**
     * Constructor
     * @param $animate  The angular animate service
     */
    constructor(private $animate: ng.animate.IAnimateService) {
        this.$animate = $animate;
    }

    public link = (scope: ng.IScope, instanceElement: ng.IAugmentedJQuery) => {

        var splashScreenRemoveEvent = scope.$on('osSplashScreen::remove', () => {
            this.$animate.leave(instanceElement).then(() => {
                // De-register scope event
                splashScreenRemoveEvent();

                // Null-ify everything else
                scope = instanceElement = null;
            });
        });
    };

}


