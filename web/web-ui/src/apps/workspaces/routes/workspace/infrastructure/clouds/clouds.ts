import {bindable} from "aurelia-framework";
import {Provider} from "common/model/api/hal/api";
import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {Workspace} from "apps/workspaces/routes/workspace/index";
import {User} from "../../../../../../common/model/security/user";

@autoinject
export class Clouds {

    @bindable
    providers: Provider[];

    @bindable
    loading: boolean;


    constructor(private parent:Workspace, private client:HttpClient) {
    }

    attached(): void {
        this.refresh();

        $('.ui.dropdown')
            .dropdown()
        ;

        $('.master.checkbox')
            .checkbox({
                // check all children
                onChecked: function() {
                    $('.ui.child.checkbox').checkbox('check');
                },
                // uncheck all children
                onUnchecked: function() {
                    $('.ui.child.checkbox').checkbox('uncheck');
                }
            })
        ;
    };

    activate(id:any)  {
        this.parent.setMenuVisible(true);
        this.refresh();
    }


    deploy(id: string) {
        let websocket = new WebSocket(`ws://${location.host}/hasli/api/docker/events`);
        websocket.onopen = (e:Event) => {
            this.client.fetch(`docker/${id}/deploy`, {
                method: 'post'
            })
                .then(r => r.json() as any)
                .then(r => console.log(r));
            console.log((e as any).data);
        };

        websocket.onmessage = (e:Event) => {
            console.log((e as any).data);
        }
    }

    refresh(): void {
        this.loading = true;

        setTimeout(() => {
            this.client.fetch('provider')
                .then(r => r.json() as any)
                .then(r => {
                    // TODO change back after testing
                    // this.providers = r;
                    this.providers = this.createMockProviders();
                    this.loading = false;
                })
                .catch(err => {
                    this.loading = false;
                });
        }, 500)
    }

    configure(id: string) : void {
        this.parent.router.navigate(`clouds/${id}/credential/new`);
    }

    addCloud() : void {
        this.parent.router.navigate('clouds/new');
    }

    createMockProviders() : Array<Provider> {
        let clouds = [];
        for (let i of [1, 2, 3, 4, 5]) {
            let c1 = new Provider();
            c1.name = "Hasli AWS west " + i;
            c1.icon = "styles/themes/hasli/assets/images/logos/aws-logo-2.svg";
            c1.location = "us-west-1";
            c1.account = "Hasli AWS Dev Account";
            c1.hosts = 2 + i;
            c1.vms = 100 + i;
            c1.bareMetal = 0;

            let owner = new User();
            owner.firstname = "Dustin";
            owner.lastname = "Lish";

            c1.owner = owner;

            clouds.push(c1)
        }


        return clouds;
    }

}

