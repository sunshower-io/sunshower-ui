/**
 * Created by dustinlish on 11/9/16.
 */

import * as cytoscape from 'cytoscape';
import {bindable} from 'aurelia-framework';


export class Builder {

    private leftVisible: boolean = true;
    private rightVisible: boolean = true;
    private expanded: number = 2;
    private states: {[key: number]: string} = {};


    private graph: HTMLElement;

    private leftSidebar: HTMLElement;

    private rightSidebar: HTMLElement;

    constructor() {
        this.states[2] = "ten";
        this.states[0] = "sixteen";
        this.states[1] = "thirteen";
    }


    public attached(): void {
        this.configureWorkspace();
        this.configureSidebars();
    }

    private configureWorkspace(): void {
        let cy = cytoscape({
            container: this.graph,
            ready: (e) => {
                // gridGuide(cytoscape);
            },
            elements: [
                {data: {id: 'a'}},
                {data: {id: 'b'}},
                {
                    data: {
                        id: 'ab',
                        source: 'a',
                        target: 'b'
                    }
                }]
        });
    }

    toggleLeft() {
        this.leftVisible = this.toggle(
            this.leftSidebar,
            this.leftVisible,
            'right'
        );
    };


    toggleRight() {
        this.rightVisible = this.toggle(
            this.rightSidebar,
            this.rightVisible,
            'left'
        );

    }

    private getCenterWidth(count: number): void {


    }

    private configureSidebars(): void {

    }

    private computeExpanded(visible: boolean) {
        return visible ? -1 : 1;
    }

    private toggle(ele:HTMLElement, v :boolean, direction:string) :boolean {

        let visible = v,
            expanded = this.computeExpanded(visible),
            previous = this.states[this.expanded],
            next = this.states[this.expanded + expanded];
        $(this.graph).removeClass(previous);
        console.log("previous", previous);
        this.prependClass(this.graph, next);
        console.log("next", next);
        if(visible) {
            visible = false;
            $(ele).hide();
        } else {
            visible = true;
            $(ele).show();
        }
        this.expanded += expanded;
        return visible;
    }

    prependClass(sel, strClass) {
        var el = $(sel);
        var classes = el.attr('class');
        classes = strClass + ' ' + classes;
        el.attr('class', classes);
    }
}