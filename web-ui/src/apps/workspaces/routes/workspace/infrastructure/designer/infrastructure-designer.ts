
import {
    autoinject,
    containerless,
    customElement
} from "aurelia-framework";
import {
    Grid,
    Designer
} from 'lib/designer/core'

import {
    Canvas
} from 'lib/designer/canvas';


@autoinject
@containerless
@customElement('infrastructure-designer')
export default class InfrastructureDesigner {


    private designer            : Designer;
    private canvas              : Canvas;
    private element             : HTMLElement;

    constructor() {


    }



}