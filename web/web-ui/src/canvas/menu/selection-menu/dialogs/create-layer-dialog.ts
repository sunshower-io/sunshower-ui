import {EditorContext} from "canvas/core/canvas";
import {inject, bindable} from 'aurelia-framework';
import {LayerService} from "component/service/layer-service";

@inject(LayerService)
export class CreateLayerDialog {

    @bindable
    private name        :string;

    @bindable
    private description         : string;

    private model: EditorContext;

    constructor(private layerService:LayerService) {

    }

    activate(model: EditorContext): void {
        this.model = model;
    }

    save(): void {
        this.layerService.create(
            this.name,
            this.description,
            this.model
        );
    }

}


