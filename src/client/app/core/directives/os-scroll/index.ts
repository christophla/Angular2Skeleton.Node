import 'angular';

import {ScrollConfigProvider} from './directive';
import {ScrollDirective} from './directive';

/**
 * Module Registration
 */
angular
    .module('os.core')
    .provider('osScrollConfig', () => new ScrollConfigProvider())
    .directive('osScroll', ScrollDirective.factory());