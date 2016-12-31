import {Registry} from "utils/registry";
import {AbstractElement} from "./element";

export class RegistryAwareElement extends AbstractElement {
    constructor(public readonly registry: Registry) {
        super();
    }
}