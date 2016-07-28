import 'angular';

import {SearchBarDirective} from './directive';

/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osSearchBar', SearchBarDirective.factory());
