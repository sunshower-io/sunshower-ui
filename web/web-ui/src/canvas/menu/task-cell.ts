import {
    mxCell,
    mxGraph,
    mxVertex,
    mxMouseEvent,
    Layer,
    mxGeometry,
    mxEvent,
    MouseListener,
} from "mxgraph";

import {Kv} from 'utils/objects';

import {
    AbstractElement
} from "canvas/element/element";


interface Listener {
    (sender: any, event: any): void;
}


export class MenuItem {
    index: number;
    icon: string;
    click: Listener;
}

export class StorageMenuItem extends MenuItem {
    constructor() {
        super();
        this.index = 1;
        this.icon = '\uf1c0';
    }
}

export class NetworkMenuItem extends MenuItem {
    constructor() {
        super();
        this.index = 0;
        this.icon = '\uf0e8';
    }
}


class MenuItemCell extends AbstractElement {

    constructor(private graph: mxGraph,
                cell: mxCell,
                parent: VertexMenu,
                private item: MenuItem) {
        super();
        this.parent = cell;
        this.geometry = new mxGeometry(
            cell.geometry.width - (32 * 2 * item.index),
            0, 32, 32
        );
        this.value = item.icon;
        this.setConnectable(false);
        this.setAttribute('constituent', '1');
        this.setAttribute('rresize', '0');
        this.setAttribute('lfix', '1');
    }

    click(sender: any, e: mxEvent) {
    }

    protected sizeChanged(): void {

        this.geometry.x =
            this.parent.geometry.width -
            (32 * (2 + this.item.index));
    }


}

function isTarget(event: mxMouseEvent, cell: Layer): boolean {
    return event.getCell() === cell;
}

class MenuContainer extends AbstractElement {

    constructor(parent: Layer) {
        super();
        this.parent = parent;
        console.log("parent", parent);
        this.geometry = new mxGeometry(
            0, 0,
            parent.geometry.width,
            32
        );


        this.setComponent(true);
        this.setConnectable(false);
    }


    protected createCss(): Kv {
        return super.createCss()
            .pair('fillOpacity', '100')
            .pair('fillColor', '#ffffff');
    }


}

export class VertexMenu extends AbstractElement implements MouseListener {

    items: mxCell[];
    toggled: boolean;

    constructor(private graph: mxGraph,
                parent: mxVertex,
                public icon: string) {
        super();
        this.geometry = new mxGeometry(
            parent.geometry.width - 32,
            0, 32, 32
        );
        this.items = [];
        this.parent = new MenuContainer(parent);
        this.value = icon;
        this.setConnectable(false);
        this.setAttribute('label', this.icon);
        this.setAttribute('constituent', '1');
        this.setAttribute('rresize', '0');
        this.setAttribute('lfix', '1');
        graph.addCell(this, this.parent);
        graph.addCell(this.parent, parent);
        graph.addMouseListener(this);
    }

    protected createCss(): Kv {
        return Kv.create(';')
            .pair('fontFamily', 'FontAwesome')
            .pair('strokeColor', 'none')
            .pair('fontSize', 16)
            .pair('fillOpacity', 0)
            .pair('fontColor', '#6B6B6B');
    }


    mouseMove(sender: mxGraph, event: mxMouseEvent): void {
    }

    mouseUp(sender: mxGraph, event: mxMouseEvent): void {

    }

    mouseDown(sender: mxGraph, event: mxMouseEvent): void {
        this.toggled = !this.toggled;
        if (isTarget(event, this)) {
            for (let o of this.items) {
                o.setVisible(this.toggled);
            }
            this.graph.refresh(this.parent);
        }
    }

    sizeChanged(): void {
        let parent = this.parent,
            gparent = parent.parent,
            pgeometry = parent.geometry,
            ggeometry = gparent.geometry;
        pgeometry.width = ggeometry.width;
        this.geometry.x = pgeometry.width - 32;

        super.sizeChanged();
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
