
import {
    autoinject,
    containerless,
    customElement,
    bindable
} from "aurelia-framework";


import {
    InfrastructureFactoryProvider
} from "apps/workspaces/lib/palette/infrastructure/infrastructure-palette";
import {OrchestrationProviderFactory} from "apps/workspaces/lib/palette/orchestration/templates/provider-factory";


@autoinject
@customElement('infrastructure-designer')
export default class InfrastructureDesigner {

    @bindable
    private infrastructureElementFactory: OrchestrationProviderFactory;

    constructor(
        infrastructureElementFactory: OrchestrationProviderFactory
    ) {
        this.infrastructureElementFactory = infrastructureElementFactory;
    }



}