import 'angular';

import {SplashScreenDirective} from './directive';

/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osSplashScreen', SplashScreenDirective.factory());
