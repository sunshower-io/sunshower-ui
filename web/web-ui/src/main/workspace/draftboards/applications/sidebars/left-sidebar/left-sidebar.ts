import {
    Draftboard,
    DraftboardManager
} from 'component/draftboard/draftboard';

import {
    ObservedEvent,
    Listener
} from 'utils/observer'

import {UUID} from 'utils/uuid';
import {HttpClient} from 'aurelia-fetch-client';
import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {CanvasEvents} from 'canvas/events/canvas-events';

@inject(
    HttpClient,
    DraftboardManager,
    EventAggregator
)
export class LeftSidebar implements Listener {

    @bindable
    private draftboards: Draftboard[];

    constructor(
        private client:HttpClient,
        private draftboardManager:DraftboardManager,
        private eventAggregator: EventAggregator
    ) {
        draftboardManager
            .addEventListener('draftboard-changed', this);
        eventAggregator.subscribe(CanvasEvents.DASHBOARD_OPENED, e => {
            client.fetch(`draftboards/${e.id}`)
                .then(r => r.json() as any)
                .then(j => this.openDraftboard(j));
        })
    }


    openDraftboard(draftboard:Draftboard) : void {
        console.log("GOT", draftboard);
    }


    open(id:string) : void {
        this.eventAggregator.publish(CanvasEvents.DASHBOARD_OPENED, {
            id: UUID.fromString(id)
        })
    }

    attached() {
        this.draftboards =
            this.draftboardManager.list();
    }

    apply(event: ObservedEvent): void {
        this.client.fetch('draftboards/list/summary')
            .then(r => r.json() as any)
            .then(d => this.draftboards = d);
    }

}