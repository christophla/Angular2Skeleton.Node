import 'angular';

import './app/core/index';


// load our default (non specific) css
// import 'font-awesome/css/font-awesome.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import './styles/screen.scss';

/**
 * Module Registration
 */
angular
  .module('app', [

    // Core
    //'os.core',

    // // Data
    // 'app.data',

    // // Index
    // 'app.application',

    // // Toolbar
    // 'app.toolbar',

    // // Navigation
    // 'app.navigation',

    // // Main
    // 'app.reporting'
  ]);

angular.bootstrap(document, ['app'], {
  strictDi: false
});
