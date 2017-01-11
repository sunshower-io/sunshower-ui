import {inject} from 'aurelia-framework'
import {Banner} from 'common/banner/banner';

export class Home {

    constructor() {
        Banner.setVisible(true);
    }

    attached() : void {
    }
}



