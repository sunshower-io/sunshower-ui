import {EditorContext, EditorOperations} from "canvas/core/canvas";
import {inject, bindable} from 'aurelia-framework';
import {DraftboardManager} from "component/draftboard/draftboard";
import {ElementFactory} from "canvas/element/element";
import {Registry} from "utils/registry";

@inject(Registry)
export class GroupItemsAsDialog {


    @bindable
    private type                    : string;

    @bindable
    private name                    : string;

    @bindable
    private description             : string;

    private  elementFactory         : ElementFactory<any>;

    private model: EditorContext;

    constructor(private registry:Registry) {

    }

    activate(model: EditorContext): void {
        this.model = model;
        this.type = EditorOperations.get(model, 'layer-type');
        this.elementFactory = EditorOperations.get(model, 'element-factory');
    }

    save(): void {
        this.elementFactory.setProperty('name', this.name);
        this.elementFactory.setProperty('description', this.description);
        this.elementFactory.create(this.model, this.registry);
        this.description = '';
        this.name = '';
    }

}


