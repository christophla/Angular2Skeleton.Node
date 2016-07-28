import 'angular';

import {SidenavHelperDirective} from './directive';

/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osSidenavHelper', () => new SidenavHelperDirective());
