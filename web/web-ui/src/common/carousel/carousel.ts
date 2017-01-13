import {
    inject,
    bindable,
    containerless
} from "aurelia-framework";
import {CarouselViewModel} from "./carousel-item";
import {Container} from "aurelia-dependency-injection";
import {Banner} from "common/banner/banner";

@containerless
@inject(Container, Banner)
export class Carousel {



    @bindable
    items: CarouselViewModel[];

    @bindable
    currentItem: CarouselViewModel;

    currentIndex: number = 0;

    constructor(
        private container: Container,
        private banner:Banner
    ) {

    }

    setCurrent(item: CarouselViewModel, index: number): void {
        this.items[this.currentIndex].active = false;
        this.currentItem = this.container.invoke(item.view);
        this.banner.label = item.title;
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