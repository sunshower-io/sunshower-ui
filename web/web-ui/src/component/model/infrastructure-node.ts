import {
    mxCell,
    mxImage,
    mxCellOverlay,
    mxConstants,
    Layer,
    mxGeometry
} from 'mxgraph';


import {Canvas} from "canvas/core/canvas";
import {Element} from 'canvas/element/element';

import {ApplicationDeployment} from "./deployment";

import {
    VertexMenu,
    NetworkMenuItem,
    StorageMenuItem
} from "canvas/menu/task-cell";

import {RegistryAwareElement} from 'canvas/element/registry-aware';
import {EditableElement} from "canvas/element/element";
import {InfrastructureNodeEditor} from "component/editors/infrastructure-node/editor";
import {
    OperatingSystem,
    NodeConfiguration
} from "model/hal/api";



export class InfrastructureNode extends
    RegistryAwareElement implements
    EditableElement<
        InfrastructureNode,
        InfrastructureNodeEditor
        > {


    readonly editor = InfrastructureNodeEditor;


    static gridWidth = 128;
    static gridHeight = 128;


    rows                : number = 1;
    columns             : number = 1;
    scale               : number = 1;
    applications        : ApplicationDeployment[] = [];

    static count: number = 0;

    public configuration                :NodeConfiguration;
    public operatingSystem              :OperatingSystem;




    constructor() {
        super();
        this.configuration = new NodeConfiguration();
        this.operatingSystem = new OperatingSystem();
        this.icon = 'assets/sui/themes/hasli/assets/images/icons/provider/generic/single-node-instance.svg';
        this.name = "Node " + InfrastructureNode.count++;
        this.set('element', '1', true);
        this.set('no-resize', '1', true);
    }

    setGeometry(geo:mxGeometry) {

        super.setGeometry(geo);
        this.resize();
    }


    findRelative() : Element {
        return this.getPredecessors()[0];
    }

    public copy() : InfrastructureNode {
        let copy = new InfrastructureNode(),
            predecessor = this.findRelative();
        copy.icon = this.icon;
        copy.geometry = this.geometry.clone();
        copy.geometry.x -= predecessor.geometry.x;
        copy.geometry.y -= predecessor.geometry.y;
        copy.host = this.host;
        for(let child of this.getChildren()) {
            let ccopy = child as any as Element;
            copy.addElement(ccopy.copy());
        }
        return copy;
    }

    public setConfiguration(configuration:NodeConfiguration) : void {
        this.configuration = configuration;
    }

    public setOperatingSystem(operatingSystem:OperatingSystem) : void {
        if(operatingSystem.icon) {
            this.icon = operatingSystem.icon;
            this.refresh();
        }
        this.operatingSystem = operatingSystem;
    }


    public addElement(e:Element) {
        this.addApplication(e as any as ApplicationDeployment);
    }

    public addTo(builder:Canvas, parent:Layer, relative:boolean) : mxCell {
        let result = super.addTo(builder, parent, relative);
        this.createMenu(builder);
        return result;
    }

    private createMenu(builder: Canvas) {
        let menu = new VertexMenu(builder, this, '\uf013');
        menu.addItem(new NetworkMenuItem());
        menu.addItem(new StorageMenuItem());

    }


    private resize() : void {
        let geo = this.geometry;
        if(!geo) {
            geo = new mxGeometry();
            this.geometry = geo;
        }
        geo.width = this.columns * InfrastructureNode.gridWidth + 24;
        geo.height = this.rows * InfrastructureNode.gridHeight + 50;
        this.sizeChanged();
    }

    public addApplication(application: ApplicationDeployment): void {
        this.applications.push(application);
        application.addPredecessor(this);
        this.addSuccessor(application);
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
        this.sizeChanged();
        this.host.model.setGeometry(this, geometry);
        this.host.refresh();
    }

    insertGridElement(
        column:number,
        row:number,
        application:ApplicationDeployment,
        geometry:mxGeometry
    ) {
        let scale = this.scale,
            applicationX = column * (InfrastructureNode.gridWidth / scale) + 24,
            applicationY = row * (InfrastructureNode.gridHeight / scale) + 50,
            applicationGeometry = application.geometry;
        applicationGeometry.x = applicationX;
        applicationGeometry.y = applicationY;
        applicationGeometry.width /= scale;
        applicationGeometry.height /= this.scale;
        application.addTo(this.host, this, false);
    }

    protected createNodeOverlay(): mxCellOverlay {
        let
            url = this.icon,
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