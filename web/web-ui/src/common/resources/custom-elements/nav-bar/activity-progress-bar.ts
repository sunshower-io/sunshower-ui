import {inject, customElement, bindable, containerless} from "aurelia-framework";
import {Activity} from "./activity-monitor-dropdown";

@containerless
@inject(Element)
@customElement('activity-progress-bar')
export class ActivityProgressBar {

    @bindable
    activity    : Activity;

    constructor(private element:Element) {

    }

    attached() : void {
        console.log('activity', this.activity);
        console.log('element', this.element);
    }


    stopActivity() : void {

    }

    retryActivity() : void {

    }

}