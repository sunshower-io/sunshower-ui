import {CanvasEvents} from 'canvas/events/canvas-events';
import {inject, bindable} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator';

import {PropertyAware, PropertyEditor} from 'common/property-editor/property-editor'


@inject(EventAggregator)
export class Editor {


    current: PropertyAware;

    onSelectionChanged = (event:any) => {
        console.log("DONE");
        this.current = event.cells[0];
    };


    constructor(private eventAggregator:EventAggregator) {
        eventAggregator.subscribe(
            CanvasEvents.CELL_SELECTION_CHANGED, this.onSelectionChanged);

    }

}