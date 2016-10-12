import {Router, RouterConfiguration} from 'aurelia-router'
import {NodeService, Nodes} from "../service/nodes/NodeService";
import {NavigationInstruction} from "aurelia-router";
import {inject} from "aurelia-dependency-injection";
import {bindable} from "aurelia-framework";


@inject(NodeService)
export class NodeOverview {
    router:Router;
    @bindable node:Node;

    @bindable id:string;

    constructor(private nodeService:NodeService) {
        console.log(nodeService)

    }


    configureRouter(config:RouterConfiguration,
                    router:Router,
                    params:Object,
                    details:Object,
                    instruction:NavigationInstruction) {
        let node =
            this.node = this.resolveNode(params, instruction);
        this.id = node.id;
        config.title = 'Stormchaser';
        config.map([{
                route: ':id/details',
                name: 'details',
                moduleId: './details/details',
                nav: true,
                href: node.id,
                title: 'Node Details',
                settings: {
                    iconClass: 'ion-document-text',
                    node: node
                }
            }, {
                route: ':id/dashboard',
                nav: true,
                name: 'dashboard',
                href: node.id,
                moduleId: './dashboard/dashboard',
                title: 'Node Dashboard',
                settings: {
                    iconClass: 'ion-clipboard'
                }
            }, {
                route: ':id/metrics',
                nav: true,
                name: 'metrics',
                href: node.id,
                moduleId: './metrics/metrics',
                title: 'Node Metrics',
                settings: {
                    node: node,
                    iconClass: 'ion-ios-analytics-outline'
                }
            }, {
                route: ':id/configuration',
                nav: true,
                name: 'configuration',
                href: node.id,
                moduleId: './configuration/configuration',
                title: 'Node Configuration',
                settings: {
                    iconClass: 'ion-edit'
                }
            },
                {
                    route: ':id/blockchain',
                    nav: true,
                    name: 'blockchain',
                    href: node.id,
                    moduleId: './blockchain/blockchain',
                    title: 'Node Blockchain',
                    settings: {
                        iconClass: 'ion-link'
                    }
                },
                {
                    route: ':id/console',
                    nav: true,
                    name: 'console',
                    href: node.id,
                    moduleId: './console/console',
                    title: 'Node Console',
                    settings: {
                        iconClass: 'ion-code'
                    }
                }, {
                    route: ':id/logs',
                    nav: true,
                    name: 'logs',
                    href: node.id,
                    moduleId: './logs/logs',
                    title: 'Node Logs',
                    settings: {
                        iconClass: 'ion-log-in'
                    }
                },
            ]
        );
        this.router = router;
    }

    resolveNode(params:Object,
                instruction:NavigationInstruction) {

        let fragment = instruction.fragment,
            id = params['id'] ||
                fragment.substring('/node/'.length,
                    fragment.lastIndexOf('/'));
        return this.nodeService.getElement(id) || Nodes.getNode();
    }

}
