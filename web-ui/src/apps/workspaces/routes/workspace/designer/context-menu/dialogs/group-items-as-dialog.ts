import {Registry} from "common/lib/utils";
import {
    inject,
    bindable
} from 'aurelia-framework';

import {ElementFactory} from "common/lib/canvas/element";
import {
    EditorContext,
    EditorOperations
} from "common/lib/canvas";

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


