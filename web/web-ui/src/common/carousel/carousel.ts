
import {
    inject,
    bindable,
    containerless
} from "aurelia-framework";
import {CarouselViewModel} from "./carousel-item";
import {Container} from "aurelia-dependency-injection";

@containerless
@inject(Container)
export class Carousel {


    @bindable
    items: CarouselViewModel[];

    @bindable
    currentItem : CarouselViewModel;

    constructor(private container:Container) {

    }

    setCurrent(item:CarouselViewModel) : void {
        if(this.currentItem) {
            this.currentItem.active = false;
        }
        this.currentItem = this.container.invoke(item.view);
        this.currentItem.active = true;
    }

    activate() : void {

    }

    open(items: CarouselViewModel[]) : void {
        this.items = items;
        this.setCurrent(this.items[0]);
    }

    close() : void {
    }

    attached() : void {
    }

}