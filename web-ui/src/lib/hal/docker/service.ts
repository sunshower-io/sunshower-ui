import {autoinject} from "aurelia-framework";
import {DockerRegistry, DockerContainer} from "./model";
import {
    Service,
    ServiceManager
} from "lib/common/service";
import {Subject} from "rxjs/Subject";
import {HttpClient} from "aurelia-fetch-client";
import {Identifier} from "lib/common/lang/identifier";

@autoinject
export class DockerRegistryService implements Service<DockerRegistry> {

    public dockerRegistry: DockerRegistry;

    static readonly paramName: string = 'dockerRegistryId';

    private currentId: string;

    private subject: Subject<DockerRegistry>;

    constructor(private client: HttpClient,
        private serviceManager: ServiceManager) {
        serviceManager.register(DockerRegistryService.paramName, this);
        this.subject = new Subject();

    }

    list(): Promise<DockerRegistry[]> {
        return this.client.fetch('registries/docker')
            .then(t => t.json() as any)
            .then(t => t.map(u => new DockerRegistry(u)));
    }

    current() : Promise<DockerRegistry> {
        let dr = this.dockerRegistry;
        if (dr && dr.id == this.currentId) {
            return Promise.resolve(dr);
        } else {
            return this.client.fetch(`registries/docker/${this.currentId}`)
                .then(t => t.json() as any)
                .then(t => {
                    this.dockerRegistry = new DockerRegistry(t);
                    this.subject.next(this.dockerRegistry);
                    return this.dockerRegistry;
                })
        }
    }

    bind(key: string): Promise<DockerRegistry> {
        if (Identifier.isIdentifier(key)) {
            this.currentId = key;
            return this.current();
        } else {
            return Promise.resolve(this.dockerRegistry);
        }
    }

    public destroy(id: string): Promise<any> {
        return this.client.fetch(`registries/docker/${id}`, {
            method: 'delete'
        }).then(t => t.json() as any);
    }

    public save(dockerRegistry: DockerRegistry): Promise<Identifier> {
        return this.client.fetch('registries/docker', {
            method: 'put',
            body: JSON.stringify(dockerRegistry)
        }).then(t => t.json() as any)
            .then(t => {
                return new Identifier(t.value);
            })
    }

    public getContainers(id: string): Promise<DockerContainer[]> {
        let path = "/ws/hal/docker-containers.json",
            fetcheroo = new HttpClient();
        return fetcheroo.fetch(path)
            .then(t => t.json() as any)
            .then(t => t.summaries.map(u => new DockerContainer(u)));
    }

}