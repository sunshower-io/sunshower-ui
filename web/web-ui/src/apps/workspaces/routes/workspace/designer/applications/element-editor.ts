import {Applications} from "./applications";
import {
    inject,
    containerless,
    Container,
    customElement
} from 'aurelia-framework';

import {
    Element,
    ElementEditor as Editor,
    EditableElement,
} from 'common/lib/canvas/element'

@containerless
@inject(Container)
@customElement('element-editor')
export class ElementEditor {

    private visible     : boolean;
    private element     : HTMLElement;
    currentEditor       : Editor<any>;

    subscribed: boolean;

    constructor(private container:Container) {

    }

    open(host: Applications, element: Element) {
        host.subject.subscribe(e => {
            this.resize(host);
        });
        this.subscribed = true;
        this.visible = true;
        this.openElement(element);
        this.resize(host);
    }

    private resize(host: Applications) {
        let hostElement = $(host.container),
            el = $(this.element),
            width = hostElement.width(),
            height = hostElement.height(),
            hostOffset = hostElement.offset(),
            newOffset = {
                top:hostOffset.top,
                left:hostOffset.left
            };
        if (host.leftVisible) {
            width -= 300;
            newOffset.left += 300;
        }
        if (host.rightVisible) {
            width -= 300;
        } else {
            width -= 0;
        }
        el.width(width);
        el.height(height);
        $(el).offset(newOffset);
    }



    close() : void {
        this.visible = false;
        $(this.element).offset({top:0, left:0});
    }

    private openElement(cell: Element) {
        if(
            cell &&
            (cell as any).hasEditorOfRole &&
            (cell as any).hasEditorOfRole('full')
        ) {
            let editableCell = cell as any as EditableElement<any, any>;
            this.currentEditor = this.container
                .invoke(editableCell.getEditorOfRole('full'));
            this.currentEditor.open(cell);
        }
    }
}