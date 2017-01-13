import {inject} from 'aurelia-framework'
import {Banner} from 'common/banner/banner';
import {FolioMenuItem, AbstractMenuItem} from 'common/folio/menu/components';

export class Home {

    items: FolioMenuItem[];
    constructor() {
        Banner.setVisible(false);
    }

    attached() : void {


    }

}








