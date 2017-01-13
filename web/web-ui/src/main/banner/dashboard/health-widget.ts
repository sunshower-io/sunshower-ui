import {Class} from 'lang/class';
import {Container} from 'aurelia-framework';
import {Widget} from 'common/carousel/widget';

export default class HealthWidget implements Widget {

    viewModel: Class<any> = HealthWidget;

    viewModelInstance: HealthWidget;
    constructor(private container:Container) {


    }

    open() : HealthWidget {
        let instance = this.container.invoke(this.viewModel);
        this.viewModelInstance = instance;
        return instance;
    }
}
