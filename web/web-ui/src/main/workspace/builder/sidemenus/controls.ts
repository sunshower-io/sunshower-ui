import {bindable} from 'aurelia-framework'
import {createEvent} from '../../../../utils/events';
import * as cytoscape from 'cytoscape';


export class Controls {

    private element:HTMLElement;

    @bindable
    private graph:any;


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

    private group(selected: Cy.CollectionElements) {
        let bbcoords = selected.renderedBoundingBox({
            includeNodes:true,
            includeEdges: false,
            includeLabels: false,
            includeShadows:true,
        });
        let node = {
            renderedPosition: {
                x: bbcoords.x1 + bbcoords.w / 2,
                y: bbcoords.y1 + bbcoords.h / 2
            },
            group: 'nodes',
            data: {
                id: 'parent',
                resizable:true,
            },
            style: {
                shape: 'rectangle',
                width: bbcoords.w + 10,
                height: bbcoords.h + 10,
                'border-color': '#929292',
                'border-width': 1,
                'background-opacity' : 0,
            }
        };


        this.graph.add(node);
        let copied = this.graph.remove(selected);
        selected.each((i, node) => {
            let n = {
                group:'nodes',
                renderedPosition:  node.renderedPosition,
                data: node.data,
            }
            this.graph.add(n);
        });




        // selected.each((i, node) => {
        //     this.graph.remove(node);
        //
        // });

        // let moved = selected.move({'parent': 'parent'});
        // moved.each((i, node)=> {
        //     node.style(selected[i].style());
        //     console.log(selected[i].style());
        // });
        // this.graph.forceRender();

        // selected.each((i, node) => {
        //     console.log(node.style());
        // })



    }
}