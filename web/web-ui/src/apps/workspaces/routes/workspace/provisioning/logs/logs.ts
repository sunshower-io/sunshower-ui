import {autoinject, bindable} from "aurelia-framework";
import {EventAggregator}  from 'aurelia-event-aggregator';
import {ChannelSet} from "common/lib/events/websockets";
import {Observable} from "rxjs/Observable";


@autoinject
export class Logs {

    private lines: string[];
    private topic: string;
    private channel: Observable<any>;

    constructor(private aggregator: EventAggregator, channels: ChannelSet) {
        this.lines = [];

    }

    attached(): void {
        this.aggregator.subscribe("logs", e => {
            if(e && e.line) {

                this.lines.push(e.line.value);
            }
        });
    }


}

