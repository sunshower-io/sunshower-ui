import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature";
import {autoinject} from "aurelia-framework";
/**
 * Created by dustinlish on 2/27/17.
 */


@autoinject
export class Containers {

    constructor(private incompleteFeature: IncompleteFeature) {

    }

    add(event: Event) : void {
        this.incompleteFeature.notify(event);

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