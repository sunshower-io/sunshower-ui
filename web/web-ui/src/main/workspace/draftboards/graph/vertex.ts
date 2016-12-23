import {UUID} from "utils/uuid";
import {Builder} from './builder';
import {
    Edge,
    Node,
    Vertex
} from 'algorithms/graph/graph';

import {
    mxImage,
    mxCell,
    Layer,
    mxGeometry,
    mxConstants
} from "mxgraph";

import {Node as InfrastructureNode} from '../cells/node';


import {Kv} from "utils/objects";
import {Registry} from "utils/registry";
import {mxCellOverlay} from "mxgraph";
import {EditorContext} from "../editor";


export class AbstractVertex<T> extends mxCell implements Vertex<T> {

    public host: Builder;
    private readonly delegate: Vertex<T>;
    private attributes: {[key: string]: string};

    private static readonly loadingOverlay: mxCellOverlay =
        AbstractVertex.createLoadingOverlay();

    constructor(id: UUID,
                public data: T,
                public parent: mxCell,
                x: number,
                y: number,
                width: number,
                height: number,
                public registry?: Registry) {
        super();
        this.delegate = new Node<T>(id.value, data);
        this.geometry = new mxGeometry(x, y, width, height);
        this.setEdge(false);
        this.setVertex(true);
        this.setStyle(this.createStyle());
    }

    setCollapsable(collapsable:boolean) {

        if(collapsable) {
            this.setAttribute('collapsable', '1');
        } else {
            delete this.attributes['collapsable'];
        }
    }

    addChild(child:Layer) : void {
        if(!this.children) {
            this.children = [];
        }
        this.children.push(child);
    }

    addTo(builder: Builder): mxCell {
        this.host = builder;
        let result = builder.addCell(this, this.parent);
        for (let overlay of this.createOverlays()) {
            builder.addCellOverlay(result, overlay);
        }
        return result;
    }

    protected createOverlays(): mxCellOverlay[] {
        return [];
    }


    protected resolveParent(context: EditorContext, x: number, y: number, type:any): Layer {
        let graph = context.graph,
            defaultParent = graph.getDefaultParent(),
            parent = graph.getCellAt(x, y, defaultParent, true, false);

        while (parent && !(parent instanceof type)) {
            parent = parent.parent;
        }
        return parent || defaultParent;
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

    public setLoading(): void {
        this.host.addCellOverlay(this, AbstractVertex.loadingOverlay);
    }

    public stopLoading() : void {
        this.host.removeCellOverlay(this, AbstractVertex.loadingOverlay);
    }


    protected static createLoadingOverlay(): mxCellOverlay {
        let
            url = 'assets/sui/themes/hasli/assets/images/rolling.svg',
            image = new mxImage(url, 40, 40),
            iconOverlay = new mxCellOverlay(
                image,
                null,
                mxConstants.ALIGN_CENTER,
                mxConstants.ALIGN_MIDDLE,
                null,
                'default'
            );
        return iconOverlay;
    }




}