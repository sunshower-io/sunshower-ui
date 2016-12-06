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
import {
    TaskMenu,
    CloseMenuItem,
    EditMenuItem,
    InfrastructureMenuItem,
    ApplicationMenuItem,
    MenuHandler
} from "../menu/task-cell";
import {Kv} from "../../../../utils/objects";

import {createEvent} from "utils/events";
import {mxEvent} from "mxgraph";
import {Listener, ObservedEvent} from "../../../../utils/observer";
import {UUID} from "../../../../utils/uuid";


export class AbstractDeploymentUnit extends AbstractVertex<Task> {

    protected host: Builder;

    constructor(registry: Registry,
                task: Task,
                parent: DeploymentUnit) {
        super(registry, task.id, task, parent, 0, 24, 160, 136);
        this.value = task.name;
        this.setComponent(true);
        this.setAttribute('hover', '0');
    }

    protected css(): Kv {
        return Kv.create(';')
            .pair('shape', 'label')
            .pair('imageWidth', 24)
            .pair('imageHeight', 24)
            .pair('fillOpacity', 0)
            .pair('strokeColor', 'none')
            .pair('verticalAlign', 'bottom')
            .pair('spacingBottom', '24')
            .pair('fontColor', '#000000')
            .pair('fontStyle', mxConstants.FONT_BOLD);
    }

    protected createStyle(): string {
        return this.css().toString();
    }


    addTo(builder: Builder): mxCell {
        this.host = builder;
        return super.addTo(builder);
    }
}

export class DeploymentUnit extends AbstractVertex<Task> implements MenuHandler, Listener {

    host: Builder;
    /**
     *
     */
    applicationDeployment: ApplicationDeploymentUnit;

    /**
     *
     */
    configurationDeployment: ConfigurationDeploymentUnit;

    /**
     *
     */
    infrastructureDeployment: InfrastructureDeploymentUnit;


    constructor(registry: Registry,
                task: Task,
                parent: Layer,
                x: number,
                y: number) {
        super(registry, task.id, task, parent, x, y, 160, 160);
        this.applicationDeployment = new ApplicationDeploymentUnit(
            registry,
            task,
            this
        );

        this.infrastructureDeployment = new InfrastructureDeploymentUnit(
            registry, task, this
        );
        this.infrastructureDeployment.setVisible(false);

        this.configurationDeployment = new ConfigurationDeploymentUnit(
            registry, task, this
        );

        this.configurationDeployment.setVisible(false);
        this.data.addEventListener('on-change', this);

    }


    before(): void {
        this.applicationDeployment.setVisible(false);
        this.configurationDeployment.setVisible(false);
        this.infrastructureDeployment.setVisible(false);
    }

    after(): void {

    }


    addTo(builder: Builder): mxCell {
        this.createMenu(builder);
        return this.addChildren(builder);
    }

    private addChildren(builder: Builder) {
        this.host = builder;
        let result = super.addTo(builder);
        this.applicationDeployment.addTo(builder);
        this.configurationDeployment.addTo(builder);
        this.infrastructureDeployment.addTo(builder);
        return result;
    }

    private createMenu(builder: Builder) {
        let menu = new TaskMenu(builder, this);
        menu.add(new CloseMenuItem());
        menu.add(new ApplicationMenuItem(this, this.applicationDeployment));
        menu.add(new EditMenuItem(this, this.configurationDeployment));
        menu.add(new InfrastructureMenuItem(this, this.infrastructureDeployment));
    }

    protected addOperatingSystemOverlay(): mxCellOverlay {
        let
            url = `assets/sui/themes/hasli/assets/images/logos/os/${this.data.deploymentTarget.operatingSystem.icon}`,
            image = new mxImage(url, 24, 24),
            iconOverlay = new mxCellOverlay(
                image,
                null,
                mxConstants.ALIGN_RIGHT,
                mxConstants.ALIGN_TOP,
                {x: -14, y: 14},
                // null,
                'default'
            );
        return iconOverlay;
    }


    protected createOverlays(): mxCellOverlay[] {
        let results = [];
        if (
            this.data.deploymentTarget &&
            this.data.deploymentTarget.operatingSystem) {
            results.push(this.addOperatingSystemOverlay());
        }
        return results;
    }

    apply(event: ObservedEvent): void {
        this.host.addCellOverlay(this, this.addOperatingSystemOverlay());
    }
}

export class ApplicationDeploymentUnit extends AbstractDeploymentUnit {


    constructor(registry: Registry, task: Task, parent: DeploymentUnit) {
        super(registry, task, parent);
    }


    protected createOverlays(): mxCellOverlay[] {
        let
            url = `${this.registry.get(Registry.S3_IMAGES_PATH)}/${this.data.icon}`,
            image = new mxImage(url, 40, 40),
            iconOverlay = new mxCellOverlay(
                image,
                null,
                mxConstants.ALIGN_CENTER,
                mxConstants.ALIGN_MIDDLE,
                null,
                'default'
            );

        let results = [iconOverlay];
        return results;
    }
}

class Label extends AbstractVertex<string> {
    /**
     *
     * @param registry
     * @param parent
     * @param x
     * @param y
     * @param width
     * @param height
     */
    constructor(
        registry:Registry,
        parent:Layer,
        x:number,
        y:number,
        width:number,
        height:number,
        public value:string
    ) {
        super(
            registry,
            UUID.randomUUID(),
            null,
            parent,
            x,
            y,
            width,
            height
        );
        this.setComponent(true);
        this.setAttribute('hover', '0');
    }




}

export class InfrastructureDeploymentUnit extends AbstractDeploymentUnit implements Listener {


    private dispatcher: HTMLElement;

    private iconOverlay: mxCellOverlay;

    constructor(registry: Registry,
                task: Task,
                parent: DeploymentUnit) {
        super(registry, task, parent);
        this.value = '';
    }


    addTo(builder: Builder): mxCell {
        this.host = builder;
        this.dispatcher = builder.container;
        return super.addTo(builder);
    }

    apply(event: ObservedEvent): void {
        this.host.removeCellOverlay(this, this.iconOverlay);
        let dt = event.target.deploymentTarget;

        this.value = `
        <div class="node-icon">
            <span>CPU: ${dt.cpu}</span>
            <span>Disk: ${dt.disk}</span>
            <span>Memory: ${dt.memory}</span>
            <span>OS Family: ${dt.operatingSystem.family}</span>
            <span>OS: ${dt.operatingSystem.name}</span>
            <span>Version: ${dt.operatingSystem.version}</span>
        <div>
        `
        this.host.refresh(this);
    }

    protected createOverlays(): mxCellOverlay[] {
        let
            url = 'assets/sui/themes/hasli/assets/images/icons/plus-green-icon.svg',
            image = new mxImage(url, 40, 40),
            iconOverlay = new mxCellOverlay(
                image,
                null,
                mxConstants.ALIGN_CENTER,
                mxConstants.ALIGN_MIDDLE,
                null,
                'default'
            );
        this.iconOverlay = iconOverlay;
        this.addListeners(iconOverlay);
        return [iconOverlay];
    }

    private addListeners(overlay: mxCellOverlay): void {
        overlay.addListener(mxEvent.CLICK, (sender: any, e: mxEvent): void => {
            let event = createEvent('add-infrastructure', this.data);
            this.dispatcher.dispatchEvent(event);
        });
        this.data.addEventListener('on-change', this);
    }


    protected css(): Kv {
        return super.css()
            .pair('align', mxConstants.ALIGN_LEFT)
            .pair('verticalAlign', mxConstants.ALIGN_BOTTOM)
            .pair('labelPadding', '8');
    }
}

export class ConfigurationDeploymentUnit extends AbstractDeploymentUnit {

    constructor(registry: Registry,
                task: Task,
                parent: DeploymentUnit) {
        super(registry, task, parent);
        this.value = "Configuration";
    }
}