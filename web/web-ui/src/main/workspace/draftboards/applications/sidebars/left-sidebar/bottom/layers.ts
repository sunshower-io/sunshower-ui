import {inject, bindable} from 'aurelia-framework';
import {Element} from 'elements/elements';
import {
    Draftboard,
    DraftboardManager
} from 'elements/draftboard';

import {Registry} from 'utils/registry';

import {Listener, ObservedEvent} from 'utils/observer';
import {ElementManager} from 'elements/element-manager';

@inject(
    Registry,
    ElementManager,
    DraftboardManager
)
export class Layers implements Listener {

    layers : Element[] = [];

    constructor(
        public registry:Registry,
        public elementManager : ElementManager,
        public draftboardManager:DraftboardManager,
    ) {
        this.elementManager.addEventListener('element-added', this);
    }

    attached() : void {
        this.draftboardManager
            .addEventListener(
                'draftboard-changed',
                this
            );
    }

    apply(event: ObservedEvent): void {
        this.layers = this.draftboardManager
            .focusedDraftboard()
            .getRootElements();
    }


}