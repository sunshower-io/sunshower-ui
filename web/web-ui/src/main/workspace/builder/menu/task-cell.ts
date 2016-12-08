import {
    mxCell,
    mxGraph,
    mxVertex,
    mxUtils,
    mxMouseEvent,
    Layer,
    mxCellStyle,
    mxEvent,
    mxStylesheet,
    MouseListener
} from "mxgraph";

import {UUID} from 'utils/uuid';
import {createFullOverrideContext} from "aurelia-templating-resources";
import {AbstractVertex} from "../graph/vertex";


interface Listener {
  (sender: any, event: any) : void;
}


export class MenuItem {
    index:number;
    icon:string;
    click :Listener;
}

export class NetworkMenuItem extends MenuItem {
    constructor() {
        super();
        this.index = 0;
        this.icon = '\uf0e8';
    }


}



class MenuItemCell extends AbstractVertex<any> {

    constructor(
        private graph:mxGraph,
        cell:Layer,
        parent:VertexMenu,
        item:MenuItem) {
        super(
            UUID.randomUUID(),
            null,
            cell,
            cell.geometry.width - 32,
            32 * (1 + item.index),
            32,
            32
        );
        this.setVisible(false);
        this.value = item.icon;
        this.setConnectable(false);
        this.setAttribute('constituent', '1');
        this.setAttribute('rresize', '0');
        this.setAttribute('lfix', '1');
    }

    click(sender:any, e:mxEvent) {

        console.log("CLICK2");
        // console.log("GOT CLICKED");
        // if(isTarget(e, this)) {
        // }
    }


}

function isTarget(event:mxMouseEvent, cell:Layer) : boolean {
    return event.getCell() === cell;
}

export class VertexMenu extends AbstractVertex<any> implements MouseListener {

    items:mxCell[];
    toggled:boolean;

    constructor(private graph: mxGraph,
                public parent: mxVertex,
                public icon: string) {
        super(UUID.randomUUID(),
            icon,
            parent,
            parent.geometry.width - 32,
            0,
            32,
            32
        );
        this.items = [];
        this.value = icon;
        this.setConnectable(false);
        this.setAttribute('label', this.icon);
        this.setAttribute('constituent', '1');
        this.setAttribute('rresize', '0');
        this.setAttribute('lfix', '1');
        this.style = 'fontFamily=FontAwesome;fontColor=#6b6b6b;fillOpacity=0;fontSize=16';
        graph.addCell(this, parent);
        graph.addMouseListener(this);
    }

    mouseMove(sender: mxGraph, event: mxMouseEvent): void {
    }

    mouseUp(sender: mxGraph, event: mxMouseEvent): void {

    }

    mouseDown(sender: mxGraph, event: mxMouseEvent): void {
        this.toggled = !this.toggled;
        if(isTarget(event, this)) {
            for(let o of this.items) {
                o.setVisible(this.toggled);
            }
            this.graph.refresh(this.parent);
        }

    }

    public addItem(item: MenuItem): void {
        let cell = new MenuItemCell(
            this.graph,
            this.parent,
            this,
            item
        );
        cell.style = this.style;
        this.items.push(cell);
        this.graph.addCell(cell, this.parent);
    }
}
