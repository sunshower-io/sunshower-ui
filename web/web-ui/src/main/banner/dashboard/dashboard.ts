import {Class} from 'lang/class';
import {CarouselViewModel} from 'common/carousel/carousel-item';

export class Dashboard implements CarouselViewModel {
    active: false;
    title: string = "Dashboard";
    view: Class<Dashboard> = Dashboard;
}