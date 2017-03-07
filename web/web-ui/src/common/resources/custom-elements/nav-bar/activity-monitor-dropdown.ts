import {ChannelSet} from 'common/lib/events'
import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Observable} from "rxjs/Observable";
import {Subscription} from "aurelia-event-aggregator";


@autoinject
export class ActivityMonitorDropdown {

    activityDD: HTMLElement;
    activities: Activity[];

    private    subscription:Subscription;

    constructor(private channels: ChannelSet,
                private aggregator: EventAggregator) {
        this.activities = [];

        this.subscription = this.aggregator.subscribe(
            Activities.started, e => {
            let activity = {
                id: e.id,
                type: 'generic',
                name: 'Some sort of file',
                meta: '2TB',
                status: "Fucking pro",
                progress: 50,
                channel: channels.subscribe(e.id)
            };
            this.activities.push(activity as Activity);


        });
    }

    attached() {
        $(this.activityDD).dropdown({
            action: 'activate',
            onChange: this.cleanDD()
        });
    }

    cleanDD(): void {
        $(this.activityDD).find('.active').removeClass('active');
        $(this.activityDD).find('.selected').removeClass('selected');
    }


}


export class Activities {
    public static readonly started : string = 'activities::started';

}


export class Activity {
    id: string;
    type                ?: string;
    name                ?: string;
    meta                ?: string;
    progress            ?: number; //percentage
    status              ?: string;
    channel             ?: Observable<any>;
    subscription        ?: Subscription;

    icon(): string {
        if (this.type == 'vmware') {
            return 'styles/themes/hasli/assets/images/activity--VMware_logo.png'
        }
        else if (this.type == 'javascript') {
            return 'styles/themes/hasli/assets/images/activity--javascript-file-icon.svg'
        }
        else {
            return 'styles/themes/hasli/assets/images/activity--generic-file-icon.svg'
        }

    }

}