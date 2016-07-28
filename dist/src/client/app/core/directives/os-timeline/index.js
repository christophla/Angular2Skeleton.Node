"use strict";
require('angular');
const directive_1 = require('./directive');
const directive_2 = require('./directive');
const directive_3 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .controller('OsTimelineController', directive_1.OsTimelineController)
    .directive('osTimeline', directive_2.osTimelineDirective)
    .directive('osTimelineItem', directive_3.osTimelineItemDirective);
//# sourceMappingURL=index.js.map