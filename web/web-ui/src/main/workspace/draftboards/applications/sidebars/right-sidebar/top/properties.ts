import {Element} from 'canvas/element/element';
import {inject} from 'aurelia-framework';

import {EventAggregator} from 'aurelia-event-aggregator';

import {
    CanvasEvent,
    CanvasEvents
} from 'canvas/events/canvas-events';

import {
    ElementEditor,
    EditableElement
} from 'canvas/element/element';

import {Container} from 'aurelia-dependency-injection';
import ApplicationState from 'storage/application-state';

@inject(EventAggregator, ApplicationState, Container)
export class Properties {

    activeElement: Element;

    currentEditor : ElementEditor<any>;


    changeEditor = (e:CanvasEvent) => {
        if(e.sender !== this)  {
            let cell = e.cells[0] as any,
                isEditor = cell.hasEditorOfRole;
            if(cell && isEditor && cell.hasEditorOfRole('basic')) {
                let editableCell = cell as any as EditableElement<any, any>;
                this.currentEditor = this.container
                    .invoke(editableCell.getEditorOfRole('basic'));
                this.currentEditor.open(cell);
            }
        }
    };

    constructor(
        private eventAggregator: EventAggregator,
        private applicationState:ApplicationState,
        private container:Container
    ) {
        eventAggregator.subscribe(
            CanvasEvents.CELL_SELECTION_CHANGED,
            this.changeEditor
        );

    }


    attached() : void {
        if(this.applicationState.currentElement) {
            let currentElement = this.applicationState.currentElement as any;
            if(currentElement.editor) {
                let editor = currentElement.editor;
                this.currentEditor = this.container.invoke(editor);
                this.currentEditor.open(currentElement);
            }
        }
    }

}