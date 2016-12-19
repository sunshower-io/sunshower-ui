import {inject} from 'aurelia-framework';
import {Element} from 'elements/elements';
import {
    Draftboard,
    DraftboardManager
} from 'elements/draftboard';

import {Listener, ObservedEvent} from 'utils/observer';
import {ElementManager} from 'elements/element-manager';

@inject(
    ElementManager,
    DraftboardManager
)
export class Layers implements Listener {

    layers : Element[] = [];

    constructor(
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

    toggle(e:Event) : void {
        let container = $(e.target).parent().parent(),
            sublist = container.find('ul'),
            caret = container.find('i.caret');
        sublist.toggle();
        caret.toggleClass((index:number, name:string, state:boolean) => {
            return state ? 'down' : 'right';
        });

        // $(e.target).parent().parent().find('ul').toggle();
    }

}