import {
    Layer,
    mxImage,
    mxCellOverlay,
    mxConstants,
    mxGeometry
} from 'mxgraph';

import {Registry} from 'utils/registry';
import {ElementEvent} from 'elements/events';

import {
    InfrastructureElement
} from 'elements/elements';

import {VirtualCloud as VPC} from 'elements/cloud';


import {LayeredNode} from "./layer";
import {ApplicationDeployment} from "./deployment";
import {Builder} from "../graph/builder";


import {
    VertexMenu,
    NetworkMenuItem,
    StorageMenuItem
} from "../menu/task-cell";
import {Constrained} from "./cell";
import {EditorContext} from "../editor";
import {VirtualCloud} from "./cloud";


export class Node extends LayeredNode<InfrastructureElement> implements Constrained {


    rows                : number = 1;
    columns             : number = 1;
    scale               : number = 1;
    applications        : ApplicationDeployment[] = [];

    static count: number = 0;

    constructor(
        parent:Layer,
        element:InfrastructureElement,
        x:number,
        y:number,
        registry?: Registry
    ) {
        super(
            parent,
            element, x, y, registry);
        this.data.name = "Host " + Node.count++;
    }

    public addTo(builder:Builder) : Layer {
        this.createMenu(builder);
        return super.addTo(builder);
    }

    private createMenu(builder: Builder) {
        let menu = new VertexMenu(builder, this, '\uf013');
        menu.addItem(new NetworkMenuItem());
        menu.addItem(new StorageMenuItem());
    }


    public addApplication(application: ApplicationDeployment): void {
        this.applications.push(application);
        try {
            this.host.model.beginUpdate();
            this.addAndResize();
        } finally {
            this.host.model.endUpdate();
        }
    }

    addGridRow() : void {
        let geo = this.geometry;
        geo.height += (144 / this.scale);
        this.rows++;
    }


    addGridColumn() : void {
        let geo = this.geometry;
        geo.width += (144 / this.scale);
        this.columns++;
    }


    resizeGrid() : void {
        if(this.columns > this.rows) {
            this.addGridRow();
        } else {
            this.addGridColumn();
        }
    }

    packed() : boolean {
        return this.applications.length >
            this.rows * this.columns;
    }

    addAndResize() : void {
        if(this.packed()) {
            this.resizeGrid();
        }
        let geometry = this.geometry,
            rows = this.rows,
            columns = this.columns,
            len = this.applications.length;
        for(let idx = 0; idx < len; idx++) {
            let row = Math.floor(idx / columns),
                column = idx % columns;
            this.insertGridElement(
                column,
                row,
                this.applications[idx],
                geometry
            );
        }
        this.updateParent(geometry);
        this.sizeChanged();

        // this.host.groupCells(this, 24, this.applications);
        this.host.model.setGeometry(this, geometry);
        this.host.refresh();
    }

    updateParent(geometry:mxGeometry) {
        // let pgeom = this.parent.geometry,
        //     pw = pgeom.width,
        //     ph = pgeom.height,
        //     w = geometry.width,
        //     h = geometry.height;
        // if(geometry.x + w > pw) {
        //     pw += 260;
        // }
        // if(geometry.y + h > ph) {
        //     ph += 260;
        // }
        // pgeom.width = pw;
        // pgeom.height = ph;
    }

    insertGridElement(
        column:number,
        row:number,
        application:ApplicationDeployment,
        geometry:mxGeometry
    ) {
        let scale = this.scale,
            applicationX = column * (144 / scale) + 24,
            applicationY = row * (144 / scale) + 48,
            applicationGeometry = application.geometry;
        applicationGeometry.x = applicationX;
        applicationGeometry.y = applicationY;
        applicationGeometry.width /= scale;
        applicationGeometry.height /= this.scale;
        application.addTo(this.host);
    }


    satisfy(context: EditorContext): void {
        let location = context.location,
            parent = this.resolveParent(context, location.x, location.y, VirtualCloud),
            graph = context.graph as Builder,
            cloud: VirtualCloud = null;
        this.addTo(graph);

        if(parent instanceof VirtualCloud) {
            cloud = parent;
            this.geometry.x = location.x - cloud.geometry.x;
            this.geometry.y = location.y - cloud.geometry.y;
        } else {
            cloud = new VirtualCloud();
            cloud.geometry.x = location.x - 50;
            cloud.geometry.y = location.y - 150;
            cloud.geometry.width = 300;
            cloud.geometry.height = 300;
            cloud.data = new VPC();
            cloud.addTo(graph);
            this.registry.draftboardManager.add(cloud.data);
        }

        this.data.parent = cloud.data;
        cloud.data.add(this.data);
        cloud.addMember(this);
    }

    protected createNodeOverlay(): mxCellOverlay {
        let
            url = `assets/sui/themes/hasli/assets/images/icons/provider/generic/single-node-instance.svg`,
            image = new mxImage(url, 24, 24),
            iconOverlay = new mxCellOverlay(
                image,
                null,
                mxConstants.ALIGN_LEFT,
                mxConstants.ALIGN_TOP,
                null,
                'default'
            );
        return iconOverlay;
    }


    protected createOverlays(): mxCellOverlay[] {
        return [this.createNodeOverlay()];
    }
}