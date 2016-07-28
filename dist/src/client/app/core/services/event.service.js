/// <reference path="../core.module.ts" />
var Core;
(function (Core) {
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
    /**
     * Module registration
     */
    angular
        .module('os.core')
        .service('osEventService', EventService);
})(Core || (Core = {}));
//# sourceMappingURL=event.service.js.map