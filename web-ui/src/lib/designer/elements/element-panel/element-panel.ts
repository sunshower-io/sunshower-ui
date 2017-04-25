import {Canvas} from "lib/designer/canvas/canvas";

import {
    Palette,
    ElementFactoryProvider, ElementFactory
} from "lib/designer/canvas/palette";


import {
    containerless,
    customElement,
    bindable,
    autoinject
} from "aurelia-framework";
import {DesignerManager} from "lib/designer/core";


@autoinject
@customElement('element-panel')
export class ElementPanel {

    @bindable
    public active           : boolean = true;

    @bindable
    private loading         : boolean;

    @bindable
    public model : ElementFactoryProvider;

    @bindable
    private factories : ElementFactory[];


    constructor(
        private readonly designerManager: DesignerManager
    ) {

    }

    activate(provider: ElementFactoryProvider) {
        this.model = provider;
        if(this.model) {
            this.loading = true;
            this.model.load().then(t => {
                this.factories = t;
                this.loading = false
            });
        }
    }





}