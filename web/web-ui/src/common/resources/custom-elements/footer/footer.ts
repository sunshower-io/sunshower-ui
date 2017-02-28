import {EventAggregator} from "aurelia-event-aggregator";
import {inject, bindable} from "aurelia-framework";
import * as PNotify from 'pnotify';
import 'pnotify.callbacks';


@inject(EventAggregator)
export class Footer {

    @bindable
    errors      : any[];

    constructor(private eventAgg:EventAggregator) {
        this.errors = [];
        this.eventAgg.subscribe('fetchError', response => this.displayError(response));
    }


    displayError(response:any) : void {
        this.errors.push(response);
    }

    clickErrors() : void {
        for (let i = 0; i < this.errors.length; i++) {
            let response = this.errors[i],
                notice = new PNotify({
                before_open: null,
                context: null,
                hide: false,
                title: response.status.toString() + ' ' + response.statusText,
                text: response.url,
                shadow: false,
                icon: false,
                addclass: 'hasli-error'
            });
            notice.get().click(() => {
                notice.remove();
                this.errors.splice(i, 1);
            })
        }
    }

}