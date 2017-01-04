import {EditorContext, EditorOperations} from "canvas/core/canvas";
import {inject, bindable} from 'aurelia-framework';
import {DraftboardManager} from "component/draftboard/draftboard";
import {ElementFactory} from "canvas/element/element";

@inject(DraftboardManager)
export class GroupItemsAsDialog {


    @bindable
    private type                    : string;

    @bindable
    private name                    : string;

    @bindable
    private description             : string;

    private  elementFactory         : ElementFactory<any>;

    private model: EditorContext;

    constructor(private draftboardManager:DraftboardManager) {


    }

    activate(model: EditorContext): void {
        this.model = model;
        this.type = EditorOperations.get(model, 'layer-type');
        this.elementFactory = EditorOperations.get(model, 'element-factory');
    }

    save(): void {
        this.elementFactory.setProperty('name', this.name);
        this.elementFactory.setProperty('description', this.description);
        this.elementFactory.create(this.model, this.draftboardManager);
        this.description = '';
        this.name = '';
    }

}


