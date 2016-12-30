import {
    Layer,
    mxCell,
    mxConstants,
    mxImage,
    Renderable,
    SceneGraphElement
} from 'mxgraph';
import {Vertex, Edge} from "algorithms/graph/graph";

import {Canvas} from 'canvas/core/canvas';

import {Kv} from "utils/objects";
import {mxCellOverlay} from "mxgraph";
import {EditorContext} from "canvas/core/canvas";
import {UUID} from "../../utils/uuid";

type Properties = {[key: string]: any};

export interface Element extends SceneGraphElement, Renderable, Layer {

    getSuccessors(): Element[];

    getPredecessors(): Element[];

}


type PropertyNode = Vertex<Properties>;

export class Relationship implements Edge<Properties> {

    static readonly SUCCESSOR            : number = 0;
    static readonly PREDECESSOR          : number = 1;


    constructor(public source: PropertyNode,
                public target: PropertyNode,
                public relationship: number) {
        this.relationship = relationship;

    }

}

export class ElementProperties {
    static readonly COLLAPSIBLE             :string = 'collapsible';
}

export abstract class AbstractElement extends mxCell implements Element,
    Vertex<Properties> {

    private static readonly loadingOverlay: mxCellOverlay =
        AbstractElement.createLoadingOverlay();


    public readonly                         id : string;
    public                                  icon : string;
    public                                  name  :string;
    public                                  host: Canvas;
    public readonly                         data: Properties;
    private readonly                        attributes: {[key: string]: string};
    public readonly                         adjacencies: {[key: string]: Edge<Properties> };


    // constructor(id: UUID,
    //             public data: T,
    //             public parent: Layer,
    //             x: number,
    //             y: number,
    //             width: number,
    //             height: number,
    //             public registry?: Registry) {
    //     super();
    //     // this.delegate = new Node<T>(id.value, data);
    //     this.geometry = new mxGeometry(x, y, width, height);
    //     this.setEdge(false);
    //     this.setVertex(true);
    //     this.setStyle(this.createStyle());
    // }

    constructor() {
        super();
        this.id = UUID.randomUUID().value;
        this.adjacencies = {};
        this.attributes = {};
        this.setVertex(true);
        this.setStyle(this.createStyle());
        this.attributes = {};
    }

    createEdge(source: PropertyNode,
                        target: PropertyNode): Relationship {
        return new Relationship(source, target, Relationship.SUCCESSOR);
    }

    addEdge(edge: Relationship): boolean {
        if (this.adjacencies[edge.target.id]) {
            return false;
        }
        this.adjacencies[edge.target.id] = edge;
        return true;
    }


    addSuccessor(successor: PropertyNode): boolean {
        if (this.adjacencies[successor.id]) {
            return false;
        }
        this.adjacencies[successor.id] = this.createEdge(this, successor);
    }

    removeEdge(target: Relationship): boolean {
        return this.removeSuccessor(target.target);
    }

    removeSuccessor(successor: PropertyNode): boolean {
        let t = this.adjacencies[successor.id];
        if (t) {
            delete this.adjacencies[successor.id];
            return true;
        }
        return false;
    }


    toString(): string {
        let result = `${this.id} -> `;
        for (let k in this.adjacencies) {
            result += k + ',';
        }
        return result;
    }


    getSuccessors(): Element[] {
        return [];
    }

    getPredecessors(): Element[] {
        return [];
    }


    setParent(cell: mxCell): void {

    }

    getChildrenOfType<U>(childType: any): U[] {
        let results = [];
        for (let i = 0; i < this.getChildCount(); i++) {
            let child = this.getChildAt(i);
            if (child instanceof childType) {
                results.push(child);
            }
        }
        return results;
    }

    protected set(attributeName: string, attributeValue: string, set: boolean): void {
        if (set) {
            this.setAttribute(attributeName, attributeValue);
        } else {
            delete this.attributes[attributeName];
        }
    }

    setAncestor(parent: boolean): void {
        this.set('synthetic', '1', parent);
    }

    setCollapsable(collapsable: boolean) {
        this.set(ElementProperties.COLLAPSIBLE, '1', collapsable);
    }


    addChild(child: Layer): void {
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


    protected resolveParent(context: EditorContext, x: number, y: number, type: any): mxCell {
        let graph = context.graph,
            defaultParent = graph.getDefaultParent(),
            parent = graph.getCellAt(x, y, defaultParent, true, false);

        while (parent && !(parent instanceof type)) {
            parent = parent.parent;
        }
        return parent || defaultParent;
    }

    getAttribute(key: string): string {
        return this.attributes && this.attributes[key];
    }

    setAttribute(key: string, value: string) {
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
                if (child instanceof AbstractElement) {
                    (<AbstractElement> child).sizeChanged();
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
        this.host.addCellOverlay(
            this,
            AbstractElement.loadingOverlay
        );
    }

    public stopLoading(): void {
        this.host.removeCellOverlay(
            this,
            AbstractElement.loadingOverlay
        );
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

