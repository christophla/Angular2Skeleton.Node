"use strict";
require('angular');
/**
 * The home index controller
 */
class IndexController {
    /**
     * Create a new index controller instance
     *
     * @param appTheming The app theming service
     */
    constructor(appTheming) {
        this.appTheming = appTheming;
        console.log('Loading IndexController...');
        this.themes = appTheming.themes;
    }
}
IndexController.$inject = ['appTheming'];
exports.IndexController = IndexController;
//# sourceMappingURL=controllers.js.map