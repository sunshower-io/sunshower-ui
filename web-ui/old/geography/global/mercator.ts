
import {Widget} from "common/carousel/widget";
import {Class} from "lang/class";
import {MercatorView} from "./vm/mercator-view";
import {Container} from "aurelia-dependency-injection";

export class MercatorMap implements Widget {
    viewModel: Class<MercatorView> = MercatorView;

    viewModelInstance : MercatorView;

    constructor(protected container:Container) {


    }

    open() : MercatorView {
        this.viewModelInstance =
            this.container.invoke(this.viewModel);
        return this.viewModelInstance;
    }


}
