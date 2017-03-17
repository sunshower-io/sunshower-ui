import {AbstractElement} from "./element";
import {EditorContext, Canvas} from "canvas/core/canvas";
import {Registry} from "utils/registry";

export class RegistryAwareElement extends AbstractElement {

    protected registry: Registry;

    beforeAdd(context: Canvas): void {
        super.beforeAdd(context);
        this.registry = context.registry;
    }
}