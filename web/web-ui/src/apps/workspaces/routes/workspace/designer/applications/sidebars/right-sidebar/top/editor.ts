import {CanvasEvents} from 'common/lib/canvas';
import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator';

import {ApplicationState} from 'common/lib/storage';
import {PropertyAware} from 'apps/workspaces/resources/custom-elements/properties'

@inject(EventAggregator, ApplicationState)
export class Editor {


    current: PropertyAware;


    onSelectionChanged = (event:any) => {
        this.current = event.cells[0];
    };


    constructor(
        private eventAggregator:EventAggregator,
        private applicationState:ApplicationState
    ) {
        eventAggregator.subscribe(
            CanvasEvents.CELL_SELECTION_CHANGED,
            this.onSelectionChanged
        );
    }

    attached() : void {
        this.current = this.applicationState.currentElement as any as PropertyAware;
    }

}