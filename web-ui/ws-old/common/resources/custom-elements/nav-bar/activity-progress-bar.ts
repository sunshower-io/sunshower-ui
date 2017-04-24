import {inject, customElement, bindable} from "aurelia-framework";
import {Activity} from "./activity-monitor-dropdown";
import {Observable} from "rxjs/Observable";
import {Subscription} from "aurelia-event-aggregator";
import * as PNotify from 'pnotify';
import 'pnotify.callbacks';

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

        this.activity.channel.getSubscription(this.activity.id).subscribe(t => {
            if (t.type == "topicFinishedEvent") {
                //make pnotify
                this.activity.progress = 100;
                let notice = new PNotify({
                        before_open: null,
                        context: null,
                        hide: true,
                        title: 'Task Complete',
                        text: '',
                        shadow: false,
                        icon: false,
                        addclass: 'hasli-success'
                    });
                notice.get().click(() => {
                    notice.remove();
                })
            } else {
                this.activity.progress += 17;
            }
            this.updateBar();
        }, e => {
        }, () => {
            this.activity.progress = 100;
            this.updateBar();
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
        //these two conditionals shouldn't be necessary but limitValues isn't working
        if (this.activity.progress > 100) {
            this.activity.progress = 100;
        }
        if (this.activity.progress < 0) {
            this.activity.progress = 0;
        }

        $(this.element).find('.ui.progress')
            .progress("set percent", this.activity.progress);
        if (this.activity.progress == 100) {
            this.activity.status = 'done';
        }
    }

}