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
    currentItem: CarouselViewModel;

    currentIndex: number = 0;

    constructor(private container: Container) {

    }

    setCurrent(item: CarouselViewModel, index: number): void {
        this.items[this.currentIndex].active = false;
        this.currentItem = this.container.invoke(item.view);
        this.items[index].active = true;
        this.currentIndex = index;
    }

    activate(): void {

    }

    open(items: CarouselViewModel[]): void {
        if(items && items.length) {
            this.items = items;
            this.setCurrent(this.items[0], 0);
        }
    }

    close(): void {
    }

    attached(): void {
    }

}