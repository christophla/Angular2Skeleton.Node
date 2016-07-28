import 'angular';

import {CardDirective} from './directive';

/**
 * Module Registration
 */
angular
    .module('os.core')
    .directive('osCard', () => new CardDirective());
