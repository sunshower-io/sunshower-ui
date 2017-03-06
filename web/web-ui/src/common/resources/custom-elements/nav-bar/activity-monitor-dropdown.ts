export class ActivityMonitorDropdown {

    activityDD      : HTMLElement;
    activities      : Activity[];


    constructor() {
        this.activities = [];

        let activity = new Activity();
        activity.type = 'generic';
        activity.name = 'Some sort of file';
        activity.meta = '2TB';
        activity.progress = 50;
        activity.status = 'in progress';
        this.activities.push(activity);
    }

    attached() {
        $(this.activityDD).dropdown({
            action: 'activate',
            onChange: this.cleanDD()
        });
    }

    cleanDD() : void {
        $(this.activityDD).find('.active').removeClass('active');
        $(this.activityDD).find('.selected').removeClass('selected');
    }

    updateProgress(activity: Activity, progressBar: HTMLElement) : void {
        $(progressBar).progress({
            percent: activity.progress
        });
    }


}

export class Activity {
    type        : string;
    name        : string;
    meta        : string;
    progress    : number; //percentage
    status      : string;

    icon() : string {
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