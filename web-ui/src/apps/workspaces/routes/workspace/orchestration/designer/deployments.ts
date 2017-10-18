import * as d3 from "d3";
import {Router} from "aurelia-router";
import {autoinject} from "aurelia-framework";

@autoinject
export class Deployments {
   
    
    constructor(private router:Router) {
        
    }
    
    graph: HTMLElement;
    
    attached() : void {

    }
    
}