import {Class} from 'lang/class';
import {CarouselViewModel} from 'common/carousel/carousel-item';

export class Activity implements CarouselViewModel {

    active: false;
    title: string = "Activity";
    view: Class<Activity> = Activity;
}