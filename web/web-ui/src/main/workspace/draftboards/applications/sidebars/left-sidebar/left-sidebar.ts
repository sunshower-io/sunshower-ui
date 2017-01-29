import {
    Draftboard,
    DraftboardManager
} from 'component/draftboard/draftboard';

import {
    ObservedEvent,
    Listener
} from 'utils/observer'


import {HttpClient} from 'aurelia-fetch-client';
import {bindable, inject} from 'aurelia-framework';

@inject(HttpClient, DraftboardManager)
export class LeftSidebar implements Listener {

    @bindable
    private draftboards: Draftboard[];

    constructor(
        private client:HttpClient,
        private draftboardManager:DraftboardManager
    ) {
        draftboardManager
            .addEventListener('draftboard-changed', this);
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