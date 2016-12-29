import {UUID} from "utils/uuid";
import {Canvas} from 'canvas/core/canvas';

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


import {Kv} from "utils/objects";
import {Registry} from "utils/registry";
import {mxCellOverlay} from "mxgraph";
import {EditorContext} from "canvas/core/canvas";


export class AbstractVertex<T> extends mxCell implements Vertex<T> {
    public                  host: Canvas;
    private readonly        delegate: Vertex<T>;
    private                 attributes: {[key: string]: string};

    adjacencies: {[key:string]: Edge<T>};

    private static readonly loadingOverlay: mxCellOverlay =
        AbstractVertex.createLoadingOverlay();

    constructor(id: UUID,
                public data: T,
                public parent: Layer,
                x: number,
                y: number,
                width: number,
                height: number,
                public registry?: Registry) {
        super();
        // this.delegate = new Node<T>(id.value, data);
        this.geometry = new mxGeometry(x, y, width, height);
        this.setEdge(false);
        this.setVertex(true);
        this.setStyle(this.createStyle());
    }

    setParent(cell:mxCell) : void {

    }

    removeSuccessor(successor: Node<T>): boolean {
        return undefined;
    }

    addSuccessor(successor: Node<T>): boolean {
        return undefined;
    }

    createEdge(source: Node<T>, target: Node<T>): Edge<T> {
        return undefined;
    }

    getChildrenOfType<U>(childType:any) : U[] {
        let results = [];
        for(let i = 0; i < this.getChildCount(); i++) {
            let child = this.getChildAt(i);
            if(child instanceof childType) {
                results.push(child);
            }
        }
        return results;
    }

    protected set(attributeName:string, attributeValue:string, set:boolean) : void {
        if(set) {
            this.setAttribute(attributeName, attributeValue);
        } else {
            delete this.attributes[attributeName];
        }
    }

    setAncestor(parent:boolean) : void {
        this.set('synthetic', '1', parent);
    }

    setCollapsable(collapsable:boolean) {
        this.set('collapsable', '1', collapsable);
        // if(collapsable) {
        //     this.setAttribute('collapsable', '1');
        // } else {
        //     delete this.attributes['collapsable'];
        // }
    }


    addChild(child:Layer) : void {
        // if(!this.children) {
        //     this.children = [];
        // }
        // this.children.push(child);

        this.insert(child);
    }

    addTo(builder: Canvas): Layer {
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


    protected resolveParent(context: EditorContext, x: number, y: number, type:any): mxCell {
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

    remove(edge: Edge<T>): boolean {
        return this.delegate.removeSuccessor(edge.target);
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