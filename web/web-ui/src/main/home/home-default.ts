import {Banner} from 'common/banner/banner';
import {Home} from "./home";
import {inject} from 'aurelia-framework';

@inject(Home)
export class HomeDefault {


    constructor(private home:Home) {
        home.pad = true;
    }

    activate(): void {
        Banner.setToggling(false);
        Banner.open();
    }

    deactivate() : void {
        Banner.setToggling(true);
        Banner.close();
        this.home.pad = false;
    }

    attached(): void {

    }
}