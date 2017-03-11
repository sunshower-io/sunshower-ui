export class AlertsDropdown {

    alertDD     : HTMLElement;
    alerts      : Alert[];

    constructor() {
        this.alerts = [];
    }

    attached() {
        $(this.alertDD).dropdown({
            action: 'activate',
            onChange: this.cleanDD()
        });

        //just some test stuff
        // let alert = new Alert();
        // alert.icon = 'blue ion-ionic';
        // alert.message = 'Hasli is great. I have a lot of fun working here, and it is an interesting project.';
        // alert.url = '/';
        // alert.time = 'Just Now';
        // this.alerts.push(alert);
    }

    view(alert : Alert) : void {
        this.cleanDD();
        window.location.href = alert.url;
    }

    remove(alert : Alert) : void {
        this.cleanDD();
        let index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    cleanDD() : void {
        $(this.alertDD).find('.active').removeClass('active');
        $(this.alertDD).find('.selected').removeClass('selected');
    }

}


export class Alert {
    icon        : string;
    message     : string;
    url         : string;
    time        : string;
}