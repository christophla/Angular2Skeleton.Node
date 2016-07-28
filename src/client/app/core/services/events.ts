
/**
 * Service bus for registering and emitting events
 *
 * @export
 * @interface IEvents
 */
export interface IEventService {
    /**
     * (description)
     *
     * @param {string} event (description)
     * @param {*} [extraParameters] (description)
     */
    emit(event: string, extraParameters?: any);
    on(event: string, callback: any, unsubscribeOnResponse?: boolean): void;
}

export class EventService implements IEventService {

    private el: any;

    constructor() {
        this.el = angular.element('div');
    }

    public on(event, callback, unsubscribeOnResponse?) {
        (this.el).on(event, function () {
            if (unsubscribeOnResponse) {
                $(this.el).off(event);
            }
            callback.apply(this, arguments); // invoke client callback
        });
    }

    public emit(event, extraParameters?) {
        $(this.el).trigger(event, extraParameters);
    }

}


