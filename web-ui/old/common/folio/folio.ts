import {bindable, customElement, containerless, inject} from "aurelia-framework";
import {FolioPage} from "./folio-page";
import {Container} from "aurelia-framework";

@containerless
@inject(Container)
@customElement('folio')
export class Folio {

    @bindable
    header: string;

    current : FolioPage;

    active : any;

    @bindable
    pages: FolioPage[];

    constructor(private container:Container) {
    }

    setActive(page:FolioPage) {
        this.current = page;
        this.active = this.container.invoke(page.view);
    }


    attached() : void {
        for(let page of this.pages) {
            if(page.active) {
                this.setActive(page);
            }
        }
    }
}