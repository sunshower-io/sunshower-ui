import {Element} from './elements';
import {
    Draftboard,
    DraftboardManager
} from './draftboard';

import {
    ElementEvent as Event
} from './events';

import {
    DefaultEventDispatcher
} from 'utils/observer';

import {inject} from "aurelia-framework";



@inject(DraftboardManager)
export class ElementManager extends DefaultEventDispatcher {

    constructor(
        public readonly draftboardManager:DraftboardManager
    ) {
        super();
    }


    add(element:Element) : Element {
        this.draftboardManager
            .focusedDraftboard()
            .addElement(element);
        this.dispatch(
            'element-added',
            new Event('element-added', element),
        );
        return element;
    }
}