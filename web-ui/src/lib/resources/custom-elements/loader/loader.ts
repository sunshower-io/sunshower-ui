import {bindable, customElement} from "aurelia-templating";

@customElement('loader')
export class Loader {
    @bindable 
    public message:string = 'Loading...';
}