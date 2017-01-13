import {Class} from 'lang/class';
import {Container} from 'aurelia-framework';
import {Widget} from 'common/carousel/widget';
import {Source, AbstractSource} from 'data/source';

import {Subject, Observable} from 'rx';

export default class InstanceWidget implements Widget {

    viewModel: Class<any> = InstanceWidget;

    viewModelInstance: InstanceWidget;

    awsSource       :Source<[number, number]>;
    azureSource     :Source<[number, number]>;
    vmwareSource    :Source<[number, number]>;

    constructor(private container:Container) {

        this.awsSource= new RandomSource();
        this.awsSource.set('name', 'AWS');
        this.awsSource.set('lineColor', '#F6A623');
        this.awsSource.start();

        this.azureSource= new RandomSource();
        this.azureSource.set('name', 'Azure');
        this.azureSource.set('lineColor', '#389BFF');
        this.azureSource.start();

        this.vmwareSource = new RandomSource();
        this.vmwareSource.set('name', 'VMWare');
        this.vmwareSource.set('lineColor', '#1EC389');
        this.vmwareSource.start();

    }

    open() : InstanceWidget {
        let instance = this.container.invoke(this.viewModel);
        this.viewModelInstance = instance;
        return instance;
    }
}

export class RandomSource extends AbstractSource<[number, number]> {


    source          : Subject<[number, number]>;

    constructor() {
        super();
        this.source = new Subject<[number, number]>();
    }

    stop(): void {
    }

    start(): void {
        let count = 0;
        setInterval(() => {
            this.source.next([
                count++,
                Math.random()
            ]);
        }, 1000)
    }

    close(): void {
    }

}
