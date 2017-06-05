import {containerless, customElement} from "aurelia-framework";
import {DesignerManager} from "lib/designer/core/designer-manager";
import {Layer} from "mxgraph";

@containerless
@customElement('layer-panel')
export class LayerPanel {

    layerPanelCollapsible: HTMLElement;

    layers: LayerNode[];

    constructor(private readonly designerManager: DesignerManager) {

    }

    attached() {
        this.layers = [];

        this.designerManager.getCurrentCanvas().listen('graph-changed').forEach(t => {
            this.layers = [];
            let outerArray = (t.data as any);
            for (let i = 0; i < outerArray.length; i++) {
                let node = this.parseNode(outerArray[i]);
                if (node != null) {
                    this.layers.push(node);
                }
            }
        });
    }

    parseNode(node: Layer) : LayerNode {
        if (node && node.isVertex()) {
            let layerNode = new LayerNode();
            layerNode.title = (node as any).label;
            layerNode.icon = (node as any).displayIcon;
            layerNode.self = node;

            if (node.children) {
                for (let j = 0; j < node.children.length; j++) {
                    let childNode = this.parseNode(node.children[j]);
                    if (childNode != null) {
                        layerNode.children.push(childNode);
                    }
                }
            }

            return layerNode;
        }
        return null;
    }

}


export class LayerNode {
    title:          string;
    icon:           string;
    self:           any;
    children:       LayerNode[] = [];
}