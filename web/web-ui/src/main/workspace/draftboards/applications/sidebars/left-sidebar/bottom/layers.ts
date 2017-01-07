import {inject, bindable} from 'aurelia-framework';
import {Element} from 'canvas/element/element';
import {
    DraftboardManager
} from 'component/draftboard/draftboard';

import {Registry} from 'utils/registry';

import {Tree} from 'common/elements/tree/tree';
import {Listener, ObservedEvent} from 'utils/observer';
import {EventAggregator} from 'aurelia-event-aggregator';
import {
    CanvasEvent,
    CanvasEvents
} from 'canvas/events/canvas-events';

@inject(
    Registry,
    DraftboardManager,
    EventAggregator
)
export class Layers implements Listener {

    element : HTMLElement;

    @bindable
    layers : Element[] = [];

    tree:Tree;

    constructor(
        public registry:Registry,
        public draftboardManager:DraftboardManager,
        private eventAggregator: EventAggregator
    ) {
        this.draftboardManager.addEventListener('element-added', this);

        eventAggregator.subscribe(
            CanvasEvents.CELL_SELECTION_CHANGED,
            this.cellSelectionChanged
        )
    }



    attached() : void {
        this.draftboardManager
            .addEventListener(
                'draftboard-changed',
                this
            );
        $(window).resize(this.resize);
    }

    apply(event: ObservedEvent): void {
        this.layers = this.draftboardManager
            .focusedDraftboard()
            .getRootElements();
        this.resize();
    }

    nodeSelected(e:Event) : void {
        this.eventAggregator.publish(
            CanvasEvents.CELL_SELECTION_CHANGED, {
                sender: this,
                cells:[(e as any).detail]
            });
    }

    private cellSelectionChanged = (e:CanvasEvent) => {
        if(e.sender !== this) {
            this.tree.focus(e.cells);
        }
    };


    private resize = () => {
        let top = $(this.element).offset().top,
            wheight = $(window).height(),
            height = wheight - top;
        $(this.element).height(height);
    }


}