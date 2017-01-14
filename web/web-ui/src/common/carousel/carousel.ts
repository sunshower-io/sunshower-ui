import {
    inject,
    bindable,
    containerless,
    TaskQueue
} from "aurelia-framework";
import {CarouselViewModel} from "./carousel-item";
import {Container} from "aurelia-dependency-injection";
import {Banner} from "common/banner/banner";
import {Subject} from 'rx';
import {ProgressEvent, ProgressMonitor} from 'utils/progress';

@containerless
@inject(Container, Banner, TaskQueue)
export class Carousel extends ProgressMonitor {


    @bindable
    loading: boolean = true;

    @bindable
    items: CarouselViewModel[];

    @bindable
    currentItem: CarouselViewModel;

    eventCount: number;

    currentIndex: number = 0;

    constructor(
        private container: Container,
        private banner:Banner,
        private taskQueue: TaskQueue
    ) {
        super(new Subject<ProgressEvent>());
        let count = 0;
        this.subject.subscribe(next => {
            if(++count === this.eventCount) {
                let sub = this.subject as any;
                this.loading = false;
                this.taskQueue.queueTask(() => {
                    sub.complete();
                });
            }
        })
    }

    setCurrent(item: CarouselViewModel, index: number): void {
        this.items[this.currentIndex].active = false;
        this.currentItem = this.container.invoke(item.view);
        this.banner.label = item.title;
        this.items[index].active = true;
        this.currentIndex = index;
    }

    itemsChanged(currentItems : CarouselViewModel[], newItems: CarouselViewModel[]) {

        let count = 0;
        for(let currentItem of currentItems) {
            let viewModels = (currentItem as any).viewModels;
            if(viewModels) {
                for(let vm of viewModels) {
                    let actualView = vm.viewModel;
                    if(actualView.publishes && actualView.publishes.length) {
                        count += actualView.publishes.length;
                    }
                }
            }
        }
        this.eventCount = count;
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