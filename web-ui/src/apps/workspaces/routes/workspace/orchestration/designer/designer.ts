
import {
    autoinject,
    containerless,
    customElement,
    bindable
} from "aurelia-framework";

import {OrchestrationProviderFactory} from "apps/workspaces/lib/palette/orchestration/templates/provider-factory";


@autoinject
@customElement('orchestration-designer')
export default class OrchestrationDesigner {

    @bindable
    private elementFactory: OrchestrationProviderFactory;

    constructor(
        elementFactory: OrchestrationProviderFactory
    ) {
        this.elementFactory = elementFactory;
    }



}