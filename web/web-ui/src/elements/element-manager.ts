import {Element} from './elements';
import {ElementEvent as Event} from './events';

import {DefaultEventDispatcher} from 'utils/observer';



export class ElementManager extends DefaultEventDispatcher {
    public elements: Element[];

    constructor() {
        super();
        this.elements = [];
    }

    add(element:Element) : Element {
        this.elements.push(element);
        this.dispatch(
            'element-added',
            new Event('element-added', element),
        );
        return element;
    }
}