/// <reference path="../../../../../typings/index.d.ts" />

/**
 * Toolbar module
 */
module Toolbar {

    /**
     * Configures the toolbar module
     *
     * @param $translatePartialLoaderProvider
     */
    function config($translatePartialLoaderProvider) {
        $translatePartialLoaderProvider.addPart('app/main/toolbar');
    }

    /**
     * Module Registration
     */
    angular
        .module('app.toolbar', [])
        .config(config);

}
