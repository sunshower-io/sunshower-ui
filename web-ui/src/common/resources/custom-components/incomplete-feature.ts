import * as PNotify from 'pnotify';
import 'pnotify.callbacks';

export class IncompleteFeature {


    constructor() {}

    notify($event: Event, closingFunction ?: () => any) : void {
        console.log('You clicked on this, and it is not hooked up to do anything', $event.target);
        let notice = new PNotify({
            before_open: null,
            context: null,
            hide: false,
            title: 'Incomplete Feature',
            text: 'This feature has not yet been implemented',
            shadow: false,
            icon: false,
            addclass: 'hasli-incomplete'
        });
        notice.get().click(() => {
            notice.remove();
        });
        if (closingFunction) {
            closingFunction();
        }
    }

}