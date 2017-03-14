import {Router, RouterConfiguration} from "aurelia-router";
import {Workspace} from "apps/workspaces/routes/workspace/index";
import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {CredentialSecret} from "common/model/security";
import {Subscription, EventAggregator} from "aurelia-event-aggregator";
import {ApplicationRevision} from "apps/workspaces/model/application/application";
import {UUID} from "common/lib/utils/uuid";
import {ChannelSet} from "common/lib/events/websockets";
import {Activities} from "common/resources/custom-elements/nav-bar/activity-monitor-dropdown";
//import {Application} from "common/model/api/core/application";

@autoinject
export class CreateInstanceWizard {

    router: Router;
    subscription: Subscription;
    deselectSubscription: Subscription;

    applicationRevision: ApplicationRevision;

    ec2Deploy: {} = {};
    policyId: string;
    providerId: string;
    credential: CredentialSecret = null;
    name: string;

    applications: ApplicationRevision[];

    selectedTags: string[];


    loading: boolean;

    constructor(private client: HttpClient,
                private workspace: Workspace,
                private channels: ChannelSet,
                private eventAggregator: EventAggregator) {
        this.applications = [];
    }


    activate(): void {

        this.subscription = this.eventAggregator.subscribe(
            'application::selected', e => {
                this.select(e);

            });

        this.deselectSubscription = this.eventAggregator.subscribe(
            'application::deselected', e => {
                this.deselect(e);
            });

    }

    deactivate(): void {
        this.subscription.dispose();
        this.deselectSubscription.dispose();
    }

    select(revision: any): void {
        this.applications.push(revision);
        this.applicationRevision = revision;
    }

    deselect(revision: any): void {
        let indexOf = this.applications.indexOf(revision);
        this.applications.splice(indexOf, 1);
        this.applicationRevision = null;
    }


    public configureRouter(config: RouterConfiguration,
                           router: Router) {
        config.title = '';
        config.map([

            // Instances Route
            //replaces instance-type-form
            {
                route: 'catalog',
                name: 'catalog',
                moduleId: 'apps/catalog/index',
                nav: false,
                title: 'Catalog'
            },

            {
                route: 'details',
                name: 'details',
                moduleId: 'apps/workspaces/routes/workspace/provisioning/instances/create/forms/instance-details-form',
                nav: false,
                title: 'Details'
            },

            {
                route: 'customize',
                name: 'customize',
                moduleId: 'apps/workspaces/routes/workspace/provisioning/instances/create/forms/app-customize-form',
                nav: false,
                title: 'Customize'
            },

            {
                route: 'summary',
                name: 'summary',
                moduleId: 'apps/workspaces/routes/workspace/provisioning/instances/create/forms/summary-form',
                nav: false,
                title: 'Summary'
            },

        ]);

        config.mapUnknownRoutes({
            route: 'instances',
            redirect: 'instances'
        });

        this.router = router;
    }

    private container: HTMLElement;

    attached(): void {
        //todo close when we're not on one of these routes

        setTimeout(() => {
            this.router.routes[0].navModel.isActive = true;
            this.router.navigateToRoute('catalog', {
                id: 'boop',
            }, {replace: true});

            console.log(this.router);
            $(this.container).modal({
                onHide: () => {
                    this.workspace.router.navigateToRoute('provisioning');
                }
            });

            $(this.container).modal('show');
        });
    }

    createRequest(): [string, string] {

        let requestId = UUID.randomUUID().value,
            activityTopicId = UUID.randomUUID().value;
        this.ec2Deploy = {
            "type": "request",
            "operation": "io.hasli.hal.aws.ec2.operations.Ec2Deploy",
            "arguments": {
                "argument": [
                    {
                        "name": "request-id",
                        "value": {
                            "value": requestId,
                            "type": "java.util.UUID"
                        }

                    },
                    {
                        "name": "keypair-name",
                        "value": {
                            "value": UUID.randomUUID().value,
                            "type": "java.lang.String"
                        }
                    }, {
                        "name": "activity-topic-id",
                        "value": {
                            "value": activityTopicId,
                            "type": "java.util.UUID"
                        }
                    },
                    {
                        "name": "create-keypair",
                        "value": {
                            "value": UUID.randomUUID().value,
                            "type": "java.lang.String"
                        }
                    },
                    {
                        "type": "EntityReference",
                        "entity-id": this.policyId,
                        "name": "compute-template",
                        "entity-type": "io.hasli.service.model.compute.ComputeTemplate"
                    },
                    {
                        "type": "EntityReference",
                        "entity-id": this.credential.id,
                        "name": "credential",
                        "entity-type": "io.hasli.model.core.auth.Credential"
                    }
                ]
            }
        };
        return [requestId, activityTopicId];
    }

    complete(): void {
        this.loading = true;
        console.log('providerId', this.providerId);
        console.log('policyId', this.policyId);
        this.client.fetch(`providers/${this.providerId}/credentials`)
            .then(response => response.json() as any)
            .then(response => {
                this.credential = response[0];
                let [reqId, activityId] = this.createRequest();

                this.eventAggregator.publish(
                    Activities.started, {
                        id: reqId
                    });

                this.eventAggregator.publish(
                    'logs::added', {
                        id: activityId
                    });

                this.eventAggregator.publish(
                    Activities.started, {
                        id: activityId
                    });
                this.channels.subscribe({id: reqId}).forEach(t => {
                });

                this.channels.subscribe({id: activityId}).forEach(t => {


                });
                this.client.fetch(`hal/compute/${this.providerId}/execute`, {
                    method: 'post',
                    body: JSON.stringify(this.ec2Deploy)
                }).then(r => r.json() as any)
                    .then(r => {
                        console.log("Deploying...");
                    });


                this.loading = false;
                $(this.container).modal('hide');
            });
    }

    /**
     * Copied from:
     * https://github.com/cmichaelgraham/aurelia-typescript/blob/master/code-sandbox/code-sandbox/views/wiz/wizard.ts
     *
     * @returns {string}
     */
    getActiveRouteIndex(): number {
        for (var routeIndex in this.router.routes) {
            var route = this.router.routes[routeIndex].navModel;
            if (route.isActive) {
                return parseInt(routeIndex);
            }
        }
    }

    next() {
        let currentIndex = this.getActiveRouteIndex();
        if (currentIndex < (this.router.routes.length - 1)) {
            currentIndex++;
            this.router.navigate((<any>this).router.routes[currentIndex].navModel.config.route, true);
        } else {
            this.complete();
        }
    }

    prev() {
        var currentIndex = this.getActiveRouteIndex();
        if (currentIndex > 0) {
            currentIndex--;
            var myRoute = (<any>this).router.navigation[currentIndex].config.route;

            // workaround for bug https://github.com/aurelia/router/issues/99
            if (myRoute === "") {
                this.router.navigate("step-one", true);
            } else {
                this.router.navigate(myRoute, true);
            }
        }
    }

}