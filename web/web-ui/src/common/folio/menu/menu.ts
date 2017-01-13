import {bindable, containerless} from 'aurelia-framework';
import {FolioMenuItem} from "./components";

@containerless
export class FolioMenu {


    @bindable
    items: FolioMenuItem[];

}

