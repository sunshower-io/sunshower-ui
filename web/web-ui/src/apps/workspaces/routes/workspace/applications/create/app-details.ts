/**
 * Created by dustinlish on 2/19/17.
 */

import {Applications} from "apps/workspaces/routes/workspace/applications/applications";
import {autoinject} from "aurelia-framework";
import {customElement} from "aurelia-framework";
import {bindable} from "aurelia-framework";

@autoinject
@customElement('create-app')
export class CreateApp {

    @bindable
    templates: Template[];

    constructor(private parent:Applications) {
        this.templates = [
            new Template('styles/themes/hasli/assets/images/blue-plus.svg', 'Custom Application'),
            new Template('styles/themes/hasli/assets/images/block.svg', 'Create New Container'),
            new Template('styles/themes/hasli/assets/images/multi-block.svg', 'Docker Compose'),
            new Template('styles/themes/hasli/assets/images/docker-swarm.svg', 'Docker Swarm'),
            new Template('styles/themes/hasli/assets/images/multi-tier-webapp.svg', '3 Tier Web App'),
            new Template('styles/themes/hasli/assets/images/cd-build-environment.svg', 'CD Build Environment'),
            new Template('styles/themes/hasli/assets/images/ms-architecture.svg', 'Microservices Architecture'),
            new Template('styles/themes/hasli/assets/images/java-ee.svg', 'Java EE Enterprise'),
        ]
    }

    activate() {
    }

    create() : void {
        this.parent.parent.router.navigate("applications/4/application")
    }

    cancel() : void {
        this.parent.showModal = false;
    }

}

export class Template {
    icon        ?: string;
    description ?: string;

    constructor(icon, desc) {
        this.icon = icon;
        this.description = desc;
    }
}