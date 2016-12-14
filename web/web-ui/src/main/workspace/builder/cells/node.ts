import {
    Layer,
    mxImage,
    mxCellOverlay,
    mxConstants,
    mxGeometry
} from 'mxgraph';
import {Registry} from 'utils/registry';

import {Task} from 'task/tasks';
import {LayeredNode} from "./layer";
import {ApplicationDeployment} from "./deployment";


export class Node extends LayeredNode<ApplicationDeployment> {


    applications: ApplicationDeployment[] = [];
    rows                : number = 1;
    columns             : number = 1;
    scale               : number = 1;

    constructor(parent:Layer, x:number, y:number, registry?: Registry) {
        super(parent, x, y, registry);
    }


    addApplicationById(id: string): void {
        console.log("Add application");
        this.registry.client.fetch(`docker/images/${id}`)
            .then(r => r.json())
            .then(r => {
                this.addApplication(
                    new ApplicationDeployment(
                        this.registry,
                        new Task(r.logo_url.large, 'frap'),
                        this,
                        this.geometry.x,
                        this.geometry.y
                    )
                )
            });
    }


    public addApplication(application: ApplicationDeployment): void {
        try {
            this.host.model.beginUpdate();
            this.host.ungroupCells(this.applications);
            this.applications.push(application);
            this.addAndResize();
        } finally {
            this.host.model.endUpdate();
        }
    }

    addGridRow() : void {
        let geo = this.geometry;
        geo.height += (184 / this.scale);
        this.rows++;
    }

    addGridColumn() : void {
        let geo = this.geometry;
        geo.width += (184 / this.scale);
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
        this.host.groupCells(this, 24, this.applications);
        this.host.model.setGeometry(this, geometry);
        this.host.refresh(this);
    }

    insertGridElement(
        column:number,
        row:number,
        application:ApplicationDeployment,
        geometry:mxGeometry
    ) {
        let scale = this.scale,
            applicationX = column * (184 / scale),
            applicationY = row * (184 / scale),
            applicationGeometry = application.geometry;
        applicationGeometry.x = applicationX;
        applicationGeometry.y = applicationY;
        applicationGeometry.width /= scale;
        applicationGeometry.height /= this.scale;
        application.addTo(this.host);
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
                // null,
                'default'
            );
        return iconOverlay;
    }


    protected createOverlays(): mxCellOverlay[] {
        return [this.createNodeOverlay()];
    }
}