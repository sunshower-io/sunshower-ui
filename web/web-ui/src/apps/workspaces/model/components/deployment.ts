import {Registry} from 'common/lib/utils';

import {
    mxImage,
    mxConstants,
    mxCellOverlay
} from "mxgraph";


import {Canvas} from "common/lib/canvas";
import {ElementEvent} from 'common/lib/canvas/element';


import {
    Listener,
    ObservedEvent
} from "common/lib/utils";


import {Class} from "common/lib/lang";


import {Layer} from "mxgraph";
import {mxGeometry} from "mxgraph";
import {Kv} from 'common/lib/utils';
import {InfrastructureNode} from "./infrastructure-node";
import {
    RegistryAwareElement,
    EditableElement,
    ElementEditor
} from "common/lib/canvas/element";

import {
    FullApplicationDeploymentEditor,
    BasicApplicationDeploymentEditor
} from "apps/workspaces/resources/editors/deployment";
import {DraftboardManager} from "apps/workspaces/services/draftboard/draftboard";


export class ApplicationDeployment extends
    RegistryAwareElement
    implements
        EditableElement<ApplicationDeployment, ElementEditor<ApplicationDeployment>
    >, Listener {
    icon: string;
    host: Canvas;

    applicationId: string;
    applicationName: string;

    static initialize():Map<string, ElementEditor<ApplicationDeployment>> {
        let result = new Map<string, ElementEditor<ApplicationDeployment>>();
        result['basic'] = BasicApplicationDeploymentEditor;
        result['full'] =  FullApplicationDeploymentEditor;
        return result;
    }

    static readonly editors: Map<string, ElementEditor<ApplicationDeployment>> = ApplicationDeployment.initialize();

    constructor() {
        super();
        this.geometry = new mxGeometry(0, 0, 100, 100);
        this.setAttribute('constituent', '1');
        this.setAttribute('no-extend-parent', '1');
    }

    getEditorOfRole(role: string): Class<ElementEditor<ApplicationDeployment>> {
        return ApplicationDeployment.editors[role];
    }

    hasEditorOfRole(role: string): boolean {
        return ApplicationDeployment.editors[role];
    }


    copy(): ApplicationDeployment {
        let copy = new ApplicationDeployment();
        copy.geometry = this.geometry.clone();
        copy.applicationId = this.applicationId;
        copy.icon = this.icon;
        return copy;
    }

    addTo(canvas: Canvas, parent: Layer, relative: boolean): Layer {
        super.addTo(canvas, parent, relative);
        this.load(parent as InfrastructureNode);
        return this;
    }


    protected load(node: InfrastructureNode) {
        this.setLoading();
        this.registry.client.fetch(`docker/images/${this.applicationId}`)
            .then(r => r.json() as any)
            .then(r => {
                this.icon = this.getIconUrl(r);
                this.applicationName = r.name;
                this.name = r.name;
                this.host.addCellOverlay(this, this.applicationOverlay());
                // node.data.add(element);
                let draftboardManager = this.registry.get(DraftboardManager) as DraftboardManager;
                draftboardManager.dispatch(
                    'element-modified',
                    new ElementEvent('element-modified', node)
                );
            });
        this.stopLoading();
    }

    private getIconUrl(r: any): string {
        return `${this.registry.get(Registry.S3_IMAGES_PATH)}/${r.logo_url.large}`;
    }

    protected applicationOverlay(): mxCellOverlay {
        let
            url = this.icon,
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


    protected createOverlays(): mxCellOverlay[] {
        let results = [];
        return results;
    }

    apply(event: ObservedEvent): void {

    }


    protected createCss(): Kv {
        let result = super
            .createCss()
            .pair('strokeColor', '#DFDFDF');
        return result;
    }

}


