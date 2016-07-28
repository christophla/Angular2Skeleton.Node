import 'angular';

import {WidgetController} from './directive';
import {WidgetDirective} from './directive';
import {WidgetFrontDirective} from './directive';
import {WidgetBackDirective} from './directive';

/**
 * Module Registration
 */
angular
    .module('os.core')
    .controller('OsWidgetController', WidgetController)
    .directive('osWidget', WidgetDirective.factory())
    .directive('osWidgetFront', WidgetFrontDirective.factory())
    .directive('osWidgetBack', WidgetBackDirective.factory());