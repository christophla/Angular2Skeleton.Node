import 'angular';

import {RandomClassDirective} from './directive';

/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osRandomClass', () => new RandomClassDirective());
