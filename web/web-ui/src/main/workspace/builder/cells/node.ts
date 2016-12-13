import {
    Layer,
    mxImage,
    mxCellOverlay,
    mxConstants
} from 'mxgraph';
import {Registry} from 'utils/registry';

import {Task} from 'task/tasks';
import {LayeredNode} from "./layer";
import {ApplicationDeployment} from "./deployment";

enum Direction {
    Horizontal,
    Vertical
}


export class Node extends LayeredNode<ApplicationDeployment> {


    private rowCount        : number;
    private columnCount     : number;


    applications: ApplicationDeployment[] = [];

    constructor(parent:Layer, x:number, y:number, registry?: Registry) {
        super(parent, x, y, registry);
        this.rowCount = 0;
        this.columnCount = 0;
    }


    addApplicationById(id: string): void {
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

    private computeDirection(): Direction {
        if(this.columnCount < this.rowCount) {
            return Direction.Horizontal;
        } else {
            return Direction.Vertical;
        }
    }

    private addVertical(application: ApplicationDeployment) {
        let geo = this.geometry,
            x = geo.x,
            y = geo.y,
            w = geo.width,
            h = geo.height;
        application.geometry.x = 24;
        if (this.applications.length == 0) {
            h = 208;
        } else {
            h = this.rowCount * 180 + 208;
        }
        application.geometry.y = h - 184;
        this.host.ungroupCells(this.applications);
        this.applications.push(application);
        application.addTo(this.host);
        this.host.groupCells(this, 24, this.applications);
        geo.x = x;
        geo.y = y;
        geo.width = w;
        geo.height = h;
        this.host.model.setGeometry(this, geo);
        this.host.refresh(this);
        this.rowCount++;
    }

    private addHorizontal(application: ApplicationDeployment) {
        let geo = this.geometry,
            x = geo.x,
            y = geo.y,
            w = geo.width,
            h = geo.height;
        application.geometry.x = w;
        if (this.applications.length == 0) {
            w = 208;
        } else {
            w = w + 180;
        }
        application.geometry.y = 24;
        this.host.ungroupCells(this.applications);
        this.applications.push(application);
        application.addTo(this.host);
        this.host.groupCells(this, 24, this.applications);
        geo.x = x;
        geo.y = y;
        geo.width = w;
        geo.height = h;
        this.host.model.setGeometry(this, geo);
        this.host.refresh(this);
        this.columnCount++;
    }


    public addApplication(application: ApplicationDeployment): void {
        let direction = this.computeDirection();
        switch (direction) {
            case Direction.Vertical:
                this.addVertical(application);
                break;
            default:
                this.addHorizontal(application);
        }
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