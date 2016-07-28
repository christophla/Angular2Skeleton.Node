import 'angular';

/**
 * The home index controller
 */
export class IndexController {

    public static $inject = ['appTheming'];
    public themes;

    /**
     * Create a new index controller instance
     *
     * @param appTheming The app theming service
     */
    constructor(private appTheming: any) {
        console.log('Loading IndexController...');
        this.themes = appTheming.themes;
    }
}
