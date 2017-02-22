import {EventAggregator} from "aurelia-event-aggregator";
import {inject, bindable} from "aurelia-framework";
import {FetchError} from "common/resources/custom-components/fetch-client-errors";

@inject(EventAggregator)
export class Footer {

    @bindable
    errors      : any[];

    constructor(private eventAgg:EventAggregator) {
        this.errors = [{}];
        this.eventAgg.subscribe(FetchError.name, response => this.displayError(response));
    }


    displayError(response:any) : void {
        this.errors.push(response)
    }

}