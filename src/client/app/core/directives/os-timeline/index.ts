import 'angular';

import {OsTimelineController} from './directive';
import {osTimelineDirective} from './directive';
import {osTimelineItemDirective} from './directive';

/**
 * Module Registration
 */
angular
    .module('os.core')
    .controller('OsTimelineController', OsTimelineController)
    .directive('osTimeline', osTimelineDirective)
    .directive('osTimelineItem', osTimelineItemDirective);
