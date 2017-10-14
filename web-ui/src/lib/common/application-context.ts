import {
    Aurelia, 
    Container
} from "aurelia-framework";
export class ApplicationContextHolder {
    private static instance: Aurelia;
    public static setInstance(application: Aurelia) {
        ApplicationContextHolder.instance = application;
    }
    
    public static getContainer() : Container {
        return ApplicationContextHolder.instance.container;
    }
    
}