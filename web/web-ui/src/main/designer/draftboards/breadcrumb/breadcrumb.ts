import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import {
    CanvasEvent,
    CanvasEvents
} from 'canvas/events/canvas-events';

import {Layer} from 'mxgraph';

@inject(EventAggregator)
export class Breadcrumb {

    private cell            :Layer;
    private ancestors       :Layer[];
    private element         :HTMLElement;

    constructor(private aggregator:EventAggregator) {
        aggregator.subscribe(CanvasEvents.CELL_SELECTION_CHANGED, (e: CanvasEvent) => {
            let cells = e.cells;
            if(cells && cells.length) {
                this.cell = cells[0];
                this.ancestors = this.findAncestors();
            }
        });
    }


    findAncestors() : Layer[] {
        let cells = [],
            current = this.cell;
        while(current && (<any>current).name) {
            cells.unshift(current);
            current = current.parent;
        }
        return cells;
    }


    pad() : void {
        $(this.element).addClass('indent');
    }

    unpad() : void {
        $(this.element).removeClass('indent');
    }
}