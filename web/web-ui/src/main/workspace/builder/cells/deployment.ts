

import {Registry} from 'utils/registry';
import {Task} from "task/tasks";
import {AbstractVertex} from "../graph/vertex";
import {
    Layer,
    mxImage,
    mxCell,
    mxConstants,
    mxCellOverlay
} from "mxgraph";
import {Builder} from "../graph/builder";


export class DeploymentUnit extends AbstractVertex<Task> {
    /**
     *
     */
    applicationDeployment       : ApplicationDeploymentUnit;

    /**
     *
     */
    configurationDeployment     : ConfigurationDeploymentUnit;

    /**
     *
     */
    infrastructureDeployment    : InfrastructureDeploymentUnit;


    constructor(
        registry:Registry,
        task:Task,
        parent:Layer,
        x:number,
        y:number
    ) {
        super(registry, task.id, task, parent, x, y, 160, 160);
        this.applicationDeployment = new ApplicationDeploymentUnit(
            registry,
            task,
            this,
            x,
            y
        );
    }



    addTo(builder: Builder): mxCell {
        let result = super.addTo(builder);
        this.applicationDeployment.addTo(builder);
        return result;
    }
}

export class ApplicationDeploymentUnit extends AbstractVertex<Task> {

    constructor(
        registry:Registry,
        task:Task,
        parent:DeploymentUnit,
        x:number,
        y:number
    ) {
        super(registry, task.id, task, parent, 0, 0, 160, 160);
        this.setComponent(true);
    }



    protected createOverlays() : mxCellOverlay[] {
        let
            url = `${this.registry.get(Registry.S3_IMAGES_PATH)}/${this.data.icon}`,
            image = new mxImage(url, 40, 40),
            iconOverlay = new mxCellOverlay(
                image,
                'frap',
                mxConstants.ALIGN_CENTER,
                mxConstants.ALIGN_MIDDLE
            );
        return [iconOverlay];
    }
}

export class InfrastructureDeploymentUnit extends AbstractVertex<Task> {

    constructor(
        registry:Registry,
        task:Task,
        parent:DeploymentUnit,
        x:number,
        y:number
    ) {
        super(registry, task.id, task, parent, 0, 20, 160, 140);
    }
}

export class ConfigurationDeploymentUnit extends AbstractVertex<Task> {

    constructor(
        registry:Registry,
        task:Task,
        parent:DeploymentUnit,
        x:number,
        y:number
    ) {
        super(registry, task.id, task, parent, 0, 20, 160, 140);
    }
}