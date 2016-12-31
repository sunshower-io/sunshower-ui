import {
    mxCell,
    mxImage,
    mxCellOverlay,
    mxConstants,
    mxGeometry
} from 'mxgraph';

import {Registry} from 'utils/registry';


import {Canvas} from "canvas/core/canvas";

import {ApplicationDeployment} from "./deployment";


import {
    VertexMenu,
    NetworkMenuItem,
    StorageMenuItem
} from "canvas/menu/task-cell";
import {Constrained} from "./cell";
import {VirtualCloud} from "./cloud";
import {EditorContext} from "canvas/core/canvas";

import {RegistryAwareElement} from 'canvas/element/registry-aware';



export class InfrastructureNode extends
    RegistryAwareElement
implements Constrained {


    static gridWidth = 128;
    static gridHeight = 128;


    rows                : number = 1;
    columns             : number = 1;
    scale               : number = 1;
    applications        : ApplicationDeployment[] = [];

    static count: number = 0;

    constructor(
        registry: Registry
    ) {
        super(registry);
        // this.setGeometry(0, 0, 120, 120);
        this.icon = 'assets/sui/themes/hasli/assets/images/icons/provider/generic/single-node-instance.svg';
        this.name = "frapper";
    }

    public addTo(builder:Canvas) : mxCell {
        this.createMenu(builder);
        return super.addTo(builder);
    }

    private createMenu(builder: Canvas) {
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
        geo.height += (InfrastructureNode.gridHeight / this.scale);
        this.rows++;
    }


    addGridColumn() : void {
        let geo = this.geometry;
        geo.width += (InfrastructureNode.gridWidth / this.scale);
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
            applicationX = column * (InfrastructureNode.gridWidth / scale) + 18,
            applicationY = row * (InfrastructureNode.gridHeight / scale) + 50,
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
            graph = context.graph,
            cloud: VirtualCloud = null;
        this.geometry = new mxGeometry(24, 24, 104, 168);
        this.addTo(graph);

        if(parent instanceof VirtualCloud) {
            cloud = parent;
            this.geometry.x = location.x - cloud.geometry.x;
            this.geometry.y = location.y - cloud.geometry.y;
        } else {
            cloud = new VirtualCloud(this.registry);
            cloud.geometry = new mxGeometry(location.x, location.y, 300, 300);
            cloud.addTo(graph);
        }
        this.parent = cloud;
        cloud.addChild(this);
        cloud.addSuccessor(this);
        cloud.regroup();
        cloud.satisfy(context);
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