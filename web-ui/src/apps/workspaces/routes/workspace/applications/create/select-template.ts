import {bindable, autoinject} from "aurelia-framework";
import {IncompleteFeature} from "common/resources/custom-components/incomplete-feature";
import {Application} from "common/model/api/sdk";


@autoinject
export class AddApplicationSelectTemplate {

    @bindable
    private application : Application;

    @bindable
    templates: {icon: string, description: string}[];

    constructor(private incompleteFeature:IncompleteFeature) {
        this.templates = [
            {icon: 'styles/themes/hasli/assets/images/blue-plus.svg', description: 'Custom Application'},
            {icon: 'styles/themes/hasli/assets/images/block.svg', description: 'Create New Container'},
            {icon: 'styles/themes/hasli/assets/images/multi-block.svg', description: 'Docker Compose'},
            {icon: 'styles/themes/hasli/assets/images/docker-swarm.svg', description: 'Docker Swarm'},
            {icon: 'styles/themes/hasli/assets/images/multi-tier-webapp.svg', description: '3 Tier Web App'},
            {icon: 'styles/themes/hasli/assets/images/cd-build-environment.svg', description: 'CD Build Environment'},
            {icon: 'styles/themes/hasli/assets/images/ms-architecture.svg', description: 'Microservices Architecture'},
            {icon: 'styles/themes/hasli/assets/images/java-ee.svg', description: 'Java EE Enterprise'},
        ]
    }

}