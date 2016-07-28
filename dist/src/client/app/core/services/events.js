"use strict";
class EventService {
    constructor() {
        this.el = angular.element('div');
    }
    on(event, callback, unsubscribeOnResponse) {
        (this.el).on(event, function () {
            if (unsubscribeOnResponse) {
                $(this.el).off(event);
            }
            callback.apply(this, arguments); // invoke client callback
        });
    }
    emit(event, extraParameters) {
        $(this.el).trigger(event, extraParameters);
    }
}
exports.EventService = EventService;
//# sourceMappingURL=events.js.map