/**
 * Created by dustinlish on 2/27/17.
 */
import {Catalog} from "apps/catalog/index";
import {HttpClient} from "aurelia-fetch-client";
import {bindable, autoinject} from "aurelia-framework";

import {EventAggregator} from 'aurelia-event-aggregator';
import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature";
import {ApplicationTemplate} from "common/model/api/application/model"

@autoinject
export class Custom {


    @bindable
    applications: ApplicationTemplate[];

    @bindable
    loading: boolean;
    constructor(
        private parent: Catalog,
        private client:HttpClient,
        private eventAggregator: EventAggregator,
        private incompleteFeature: IncompleteFeature
    ) {
    }

    select(applicationRevision:any, $event:Event) : void {
        let button = $($event.target);
        if (button.hasClass('basic')) {
            this.eventAggregator.publish(
                'application::selected',
                applicationRevision
            );
            button.removeClass('basic').text('Added');
        }
        else {
            this.eventAggregator.publish(
                'application::deselected',
                applicationRevision
            );
            button.addClass('basic').text('Add');
        }
    }

    open($event: Event) : void {
        this.incompleteFeature.notify($event);
    }


    attached() : void {
        this.loading = true;
        setTimeout(() => {
            this.client.fetch(`workspaces/${this.parent.id}/applications/heads`)
                .then(d => d.json() as any)
                .then(d => {
                    this.loading = false;
                    this.applications = d;
                    console.log(d);
                })
                .catch(err => {
                    console.log("Err");
                    this.loading = false;
                });
        }, 500)
    }
}