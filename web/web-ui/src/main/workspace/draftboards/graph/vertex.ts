import {UUID} from "utils/uuid";
import {Builder} from './builder';
import {
    Edge,
    Node,
    Vertex
} from 'algorithms/graph/graph';

import {
    mxCell,
    mxGeometry,
    mxConstants
} from "mxgraph";


import {Kv} from "utils/objects";
import {Registry} from "utils/registry";
import {mxCellOverlay} from "mxgraph";


export class AbstractVertex<T> extends mxCell implements Vertex<T> {

    private readonly delegate: Vertex<T>;
    private attributes: {[key: string]: string};

    constructor(id: UUID,
                public data: T,
                public parent: mxCell,
                x: number,
                y: number,
                width: number,
                height: number,
                public registry?: Registry
    ) {
        super();
        this.delegate = new Node<T>(id.value, data);
        this.geometry = new mxGeometry(x, y, width, height);
        this.setEdge(false);
        this.setVertex(true);
        this.setStyle(this.createStyle());
    }

    addTo(builder: Builder): mxCell {
        let result = builder.addCell(this, this.parent);
        for (let overlay of this.createOverlays()) {
            builder.addCellOverlay(result, overlay);
        }
        return result;
    }

    protected createOverlays(): mxCellOverlay[] {
        return [];
    }

    add(edge: Edge<T>): boolean {
        return this.delegate.add(edge);
    }

    remove(edge: Node<T>): boolean {
        return this.delegate.remove(edge);
    }

    getAttribute(key: string): string {
        return this.attributes && this.attributes[key];
    }

    setAttribute(key: string, value: string) {
        if (!this.attributes) {
            this.attributes = {};
        }
        this.attributes[key] = value;
    }


    setComponent(component: boolean): void {
        if (component) {
            this.setAttribute('constituent', '1');
        } else {
            if (this.attributes) {
                delete this.attributes['constituent'];
            }
        }
    }

    protected sizeChanged(): void {
        if (this.children) {
            for (let child of this.children) {
                if (child instanceof AbstractVertex) {
                    (<AbstractVertex<any>>child).sizeChanged();
                }
            }
        }
    }

    protected createCss(): Kv {
        return Kv.create(';')
            .pair('shape', 'label')
            .pair('imageWidth', 24)
            .pair('imageHeight', 24)
            .pair('fillOpacity', 0)
            .pair('strokeColor', '#B8B8B8')
            .pair('verticalAlign', 'bottom')
            .pair('spacingBottom', '24')
            .pair('verticalLabelPosition', mxConstants.ALIGN_CENTER)
            .pair('labelPosition', mxConstants.ALIGN_MIDDLE)
            .pair('fontColor', '#000000')
            .pair('fontStyle', mxConstants.FONT_BOLD)
    }

    protected createStyle(): string {
        return this.createCss().toString();
    }

}