import {Class} from 'lang/class';
import {Subject} from 'rx';
import {
    Source,
    AbstractSource
} from 'data/source';
import {Container} from 'aurelia-framework';
import {Widget} from 'common/carousel/widget';

export default class HealthWidget implements Widget {

    viewModel   : Class<any> = HealthWidget;

    viewModelInstance   : HealthWidget;

    healthy             :  Source<[number, number]>;
    unhealthy           :  Source<[number,number]>;
    unknown             :  Source<[number, number]>;
    shutdown            :  Source<[number,number]>;


    constructor(private container:Container) {
        this.healthy = new SingleSource('#1ec389', 101, 157);
        this.unhealthy = new SingleSource('#d1001a', 12, 157);
        this.unknown   = new SingleSource('#f6a623', 45, 157);
        this.shutdown = new SingleSource('#70717f', 9, 157);
    }

    open() : HealthWidget {
        let instance = this.container.invoke(this.viewModel);
        this.viewModelInstance = instance;
        return instance;
    }

    attached() : void {
        this.healthy.start();
        this.unknown.start();
        this.unhealthy.start();
        this.shutdown.start();


    }
}

export class SingleSource extends AbstractSource<[number, number]> {
    constructor(color:string, private v:number, private max:number) {
        super();
        this.set('fillColor', color);
        this.source = new Subject<[number, number]>();
    }

    stop(): void {

    }

    start(): void {
        this.source.next([this.v, this.max]);
    }

    close(): void {
    }

}
