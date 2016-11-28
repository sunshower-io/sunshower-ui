import {bindable} from 'aurelia-framework'
import {createEvent} from '../../../../utils/events';
import * as cytoscape from 'cytoscape';
import {Overlay} from "./group-menu/overlay";


export class Controls {

    private element:HTMLElement;

    @bindable
    private graph:any;


    private overlay:Overlay;
    private activated:boolean = false;

    layoutMenu(parent:any, children:any[]) {
        this.graph.startBatch();
        let prendered = parent.renderedPosition();
        for(var child of children) {
            let tchild = <any>child;
            tchild.renderedPosition({
                x:prendered.x,
                y:prendered.y,
            })
        }
        this.graph.endBatch();
    }


    addGroup() : void {
        let selected = this.graph.$('node:selected');
        if(selected.length > 0) {
            this.group(selected);
        } else {
            this.createGroupNode();
        }

    }

    private createGroupNode() {

    }
    i:number = 0;

    private group(selected: Cy.CollectionElements) {
        let bbcoords = selected.renderedBoundingBox({
            includeNodes:true,
            includeEdges: false,
            includeLabels: false,
            includeShadows:true,
        });
        this.i++;

        let
        parentId = 'parent' + this.i,
        nodeContainer = {
            renderedPosition: {
                x: bbcoords.x1 + bbcoords.w / 2,
                y: bbcoords.y1 + bbcoords.h / 2
            },

            data: {
                container: true,
                id: parentId,
            },

            style: {
                width: bbcoords.w + 16,
                height: bbcoords.h,
                "padding-left" : 8,
                "padding-top" : 8,
                "padding-right" : 8,
                "padding-bottom":8,
                "background-color": 'white',
                'background-opacity' : 1,
                'border-color': '#929292',
                'border-width': 1,
            }
        };
        let container = this.graph.add(nodeContainer);
        selected.move({parent: parentId});
        this.registerEvents(container);
    }


    private registerEvents(container: any) {
        container.on('cxttapstart', e => {
            this.overlay = new Overlay(this.graph, container);
            this.overlay.show();
        });
        container.on('cxttapend', e => {
            if(this.overlay) {
                this.overlay.hide();
                this.overlay.destroy();
                this.overlay = null;
            }
        });
    }

}