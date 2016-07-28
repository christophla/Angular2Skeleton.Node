import 'angular';

import {ResponsiveTableDirective} from './directive';

/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osResponsiveTable', () => new ResponsiveTableDirective());
