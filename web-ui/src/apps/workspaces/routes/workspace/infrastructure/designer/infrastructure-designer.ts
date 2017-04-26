
import {
    autoinject,
    containerless,
    customElement,
    bindable
} from "aurelia-framework";


import {
    InfrastructureFactoryProvider
} from "apps/workspaces/lib/palette/infrastructure/infrastructure-palette";


@autoinject
@customElement('infrastructure-designer')
export default class InfrastructureDesigner {

    @bindable
    private infrastructureElementFactory: InfrastructureFactoryProvider;

    constructor(
        infrastructureElementFactory: InfrastructureFactoryProvider
    ) {
        this.infrastructureElementFactory = infrastructureElementFactory;
    }



}