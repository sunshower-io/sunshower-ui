import {EventAggregator} from "aurelia-event-aggregator";
import {autoinject, bindable} from "aurelia-framework";
import * as PNotify from 'pnotify';
import 'pnotify.callbacks';
import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature";


@autoinject
export class Footer {

    @bindable
    errors      : any[];

    constructor(private eventAgg:EventAggregator,
                private incompleteFeature:IncompleteFeature) {
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
                title: (response.status ? response.status.toString() + ' ' : '') + response.statusText,
                text: (response.url ? response.url : ''),
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