import {Class} from 'lang/class';
import {inject, Container} from 'aurelia-framework';
import {MercatorMap} from 'geography/global/mercator';
import {Widget, WidgetView} from 'common/carousel/widget';
import {CarouselViewModel} from 'common/carousel/carousel-item';


@inject(Container)
export class Dashboard implements CarouselViewModel, WidgetView {
    container: HTMLElement;

    active: false;
    title: string = "Dashboard";
    view: Class<Dashboard> = Dashboard;

    viewModels: Widget[];

    constructor(container:Container) {
        this.viewModels = [
            new MercatorMap(container)
        ];
    }


    add(widget: Widget): void {


    }

    list(): Widget {
        return undefined;
    }


}