/**
 * Created by dustinlish on 2/27/17.
 */

export class Containers {


    add(event: MouseEvent) : void {
        let $element = $(event.target);
        if ($element.hasClass('basic')) {
            $element.removeClass('basic').text('Added');
        } else {
            $element.addClass('basic').text('Add');
        }
    }

}