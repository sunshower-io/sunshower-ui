import {Element} from 'canvas/element/element';
import {inject} from 'aurelia-framework';

import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Properties {

    activeElement: Element;

    attached() : void {

    }

}