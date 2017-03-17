import {inject, bindable} from 'aurelia-framework';
import {Element} from 'common/lib/canvas/element';

import {
    Registry,
    Listener,
    ObservedEvent
} from 'common/lib/utils';

import {Tree} from 'common/resources/custom-elements/tree';
import {EventAggregator} from 'aurelia-event-aggregator';
import {
    CanvasEvent,
    CanvasEvents
} from 'common/lib/canvas';
import {DraftboardManager} from "apps/workspaces/services/draftboard/draftboard";

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
        this.tree.focus(e.cells);
    };


    private resize = () => {
        let top = $(this.element).offset().top,
            wheight = $(window).height(),
            height = wheight - top;
        $(this.element).height(height);
    }


}