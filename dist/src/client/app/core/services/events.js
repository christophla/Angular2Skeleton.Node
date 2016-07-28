"use strict";
var EventService = (function () {
    function EventService() {
        this.el = angular.element('div');
    }
    EventService.prototype.on = function (event, callback, unsubscribeOnResponse) {
        (this.el).on(event, function () {
            if (unsubscribeOnResponse) {
                $(this.el).off(event);
            }
            callback.apply(this, arguments); // invoke client callback
        });
    };
    EventService.prototype.emit = function (event, extraParameters) {
        $(this.el).trigger(event, extraParameters);
    };
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=events.js.map