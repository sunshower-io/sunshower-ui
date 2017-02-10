import {Class} from 'lang/class';
import {CarouselViewModel} from 'common/carousel/carousel-item';

export class Deployments implements CarouselViewModel {
    active: false;
    title: string = "Deployments";
    view: Class<Deployments> = Deployments;
}
