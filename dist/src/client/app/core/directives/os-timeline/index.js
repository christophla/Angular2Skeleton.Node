"use strict";
require('angular');
var directive_1 = require('./directive');
var directive_2 = require('./directive');
var directive_3 = require('./directive');
/**
 * Module Registration
 */
angular
    .module('os.core')
    .controller('OsTimelineController', directive_1.OsTimelineController)
    .directive('osTimeline', directive_2.osTimelineDirective)
    .directive('osTimelineItem', directive_3.osTimelineItemDirective);
//# sourceMappingURL=index.js.map