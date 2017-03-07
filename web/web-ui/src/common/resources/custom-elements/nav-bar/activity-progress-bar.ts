import {inject, customElement, bindable} from "aurelia-framework";
import {Activity} from "./activity-monitor-dropdown";


@inject(Element)
@customElement('activity-progress-bar')
export class ActivityProgressBar {

    @bindable
    activity    : Activity;


    constructor(private element:Element) {

    }

    attached() : void {
        $(this.element).find('.ui.progress').progress({
            percent: this.activity.progress,
            text: '',
            limitValues: true
        });

        // setTimeout(() => {
        //     this.activity.progress = 75;
        //     console.log('should update progress', this.activity.progress);
        //     this.updateBar();
        // }, 10000);
        //
        // setTimeout(() => {
        //     this.activity.progress = 100;
        //     console.log('should update progress', this.activity.progress);
        //     this.updateBar();
        // }, 20000);
    }


    stopActivity() : void {
        $(this.element).find('.ui.progress').progress("set error");
        this.activity.status = 'stopped';
    }

    retryActivity() : void {
        $(this.element).find('.ui.progress').progress("remove error");
        this.activity.status = 'in progress';
    }

    updateBar() : void {
        // $(this.element).find('.ui.progress')
        //     .progress("set percent", this.activity.progress);
        if (this.activity.progress == 100) {
            this.activity.status = 'done';
        }
    }

}