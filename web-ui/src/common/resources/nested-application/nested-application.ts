import {
    Aurelia,
    noView,
    bindable,
    inject,
    Container,
    Loader,
    processContent,
    autoinject
} from "aurelia-framework"

@noView
@autoinject
@processContent(false)
export class NestedApplication {


    @bindable
    main: string;
    @bindable
    host: HTMLElement

    private application: Aurelia;

    constructor(private loader: Loader) {
        this.application = new Aurelia(loader, new Container());
        this.application.use.standardConfiguration();

    }


    attached(): void {
        console.log("Got", this.host);

        this.application.start().then(a => {
            a.setRoot(this.main, document.getElementById("nested")).then(c => {
            })
        });

    }

    // mainChanged(): void {
    // }
}