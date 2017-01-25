import {bindable} from "aurelia-framework";
import {ElementEditor} from "canvas/element/element";
import {CompositeElement} from "component/model/layer";

export class FullLayerEditor implements ElementEditor<CompositeElement> {

    @bindable
    private layer:CompositeElement;

    open(e: CompositeElement) {
        this.layer = e;
    }

}