import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature";
import {HttpClient} from "aurelia-fetch-client";
import {autoinject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Catalog} from "apps/catalog/index";
/**
 * Created by dustinlish on 2/27/17.
 */


@autoinject
export class Containers {

    constructor(        private parent: Catalog,
                        private client:HttpClient,
                        private eventAggregator: EventAggregator,
                        private incompleteFeature: IncompleteFeature) {

    }

    attached() : void {
        //should get length to recalculate
        $('.ui.modal').modal("refresh");
    }

    add(event: Event) : void {
        this.incompleteFeature.notify(event);
        //todo save it to wizard's applications

        // let $element = $(event.target);
        // if ($element.hasClass('basic')) {
        //     $element.removeClass('basic').text('Added');
        // } else {
        //     $element.addClass('basic').text('Add');
        // }
    }

    open(event: Event) : void {
        this.incompleteFeature.notify(event);
    }

}