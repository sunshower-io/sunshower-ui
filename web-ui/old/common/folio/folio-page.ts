import {customElement, containerless} from 'aurelia-framework';
import {Class} from "lang/class";

export class FolioPage {

    icon            : string;
    active          : boolean;
    title           : string;
    view            : Class<any>;

}