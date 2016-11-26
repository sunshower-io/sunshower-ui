/**
 * Created by dustinlish on 11/9/16.
 */

import * as gridGuide from 'cytoscape-grid-guide'
import {inject, bindable} from 'aurelia-framework';
import {ImageDescriptor} from '../../../model/hal/image'
import {HttpClient} from "aurelia-fetch-client";
import * as ocanvas from 'ocanvas';

import * as nodeResize from 'cytoscape-node-resize';
import * as cytoscape from 'cytoscape';

@inject(HttpClient)
export class Builder {

    private leftVisible: boolean = true;
    private rightVisible: boolean = true;
    private expanded: number = 2;
    private states: {[key: number]: string} = {};


    @bindable
    private graphInstance:any;
    private graph: HTMLElement;

    private leftSidebar: HTMLElement;

    private rightSidebar: HTMLElement;


    constructor(private client:HttpClient) {
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
            boxSelectionEnabled:true,
            ready: (e) => {
                gridGuide(cytoscape);
                nodeResize(cytoscape, $, ocanvas);
            },

            style: (<any>cytoscape).stylesheet()
                .selector('node:selected')
                .style({
                    "font-weight": "bold",
                    "border-style": "dashed",
                    "background-blacken": 0.1,
                    "border-opacity": 1,
                }),
            elements: [],
        });


        this.graphInstance = cy;
        (<any>window).cy = cy;
        (<any>window).cytoscape = cy;

        cy.nodeResize({
            boundingRectangleLineColor: '#828282',
            inactiveGrappleStroke: '0',
            isNoResizeMode: (node) => {
                return !node.data('resizable');
            }
        });


        cy.gridGuide({
            snapToGrid:true,
            discreteDrag:true,
            guidelines:true,
            panGrid:true
        });
    }

    toggleLeft() {
        this.leftVisible = this.toggle(
            this.leftSidebar,
            this.leftVisible,
            'right'
        );
    };

    onItemDropped(e:Event) :void {
        console.log(e);
    }

    onImageAdded(e:Event) : void {
        let value = (<any>e).detail.value;

        this.client.fetch(`docker/images/${value}`)
            .then(r => r.json())
            .then(r => this.add(r, e));
    }

    add(imageDescriptor: ImageDescriptor, e:any) {
        console.log(imageDescriptor.logo_url.large)

        let rawPosition = e.detail.location,
            graphPosition = $(this.graph).offset(),
            x = rawPosition.x - graphPosition.left,
            y = rawPosition.y - graphPosition.top,
            position = {x:x, y:y},
            contents = this.computeWidth(imageDescriptor.name),
            width = contents[0],
            label = contents[1];



        this.graphInstance.add([{
            group: 'nodes',
            renderedPosition: position,
            data: {
                id: imageDescriptor.id,
                resizable:false,
            },
            style : {
                shape: 'rectangle',
                width:width,
                height:"42",
                "background-image": `/hasli/api/v1/storage/s3/images/${imageDescriptor.logo_url.large}`,
                "background-width":"16px",
                "background-height":"16px",
                "background-color" : "white",
                "background-position-x": "8px",
                "border-color":"#a0a0a0",
                "border-width": "1px",
                "border-style": "solid",
                'shadow-blur': 10,
                'shadow-color': '#000000',
                'shadow-offset-x': 0,
                'shadow-offset-y': 0,
                'shadow-opacity': 0.9,
                "text-valign": "center",
                "text-halign": "center",
                "label": label,
                "font-size": "1em",
                "font-family": "Open Sans",
            }
        }])
    }


    computeWidth(value:string) : [number, string] {
        let len = value.length,
            substring = value.substring(0, 10);
        return [140, substring]
    }


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

        this.graphInstance.gridGuide({
            snapToGrid:true,
            discreteDrag:true,
            guidelines:true,
            panGrid:true
        });
        return visible;
    }

    prependClass(sel, strClass) {
        var el = $(sel);
        var classes = el.attr('class');
        classes = strClass + ' ' + classes;
        el.attr('class', classes);
    }
}