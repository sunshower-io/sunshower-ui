import {AbstractElement} from "./element";
import {Registry} from "common/lib/utils";
import {Canvas} from "common/lib/canvas";

export class RegistryAwareElement extends AbstractElement {
    protected registry: Registry;
    beforeAdd(context: Canvas): void {
        super.beforeAdd(context);
        this.registry = context.registry;
    }
}