import {Service, ServiceManager} from "lib/common/service";
import {HttpClient} from "aurelia-fetch-client";
import {OrchestrationTemplate} from "./model";
import {Identifier} from "lib/common/lang/identifier";
import {Subject} from "rxjs/Subject";
import {autoinject} from "aurelia-framework";
import {TaskGraph} from "lib/designer/model/graph/graph-element";
import {Content} from "lib/designer/model/graph/vertex";
import {Property} from "lib/designer/model/entity";

@autoinject
export class OrchestrationTemplateService implements Service<OrchestrationTemplate> {

    public orchestrationTemplate: OrchestrationTemplate;

    static readonly paramName: string = 'orchestrationTemplateId';

    private currentId: string;

    private subject: Subject<OrchestrationTemplate>;

    constructor(private client: HttpClient,
                private serviceManager: ServiceManager) {
        serviceManager.register(OrchestrationTemplateService.paramName, this);
        this.subject = new Subject();
    }

    bind(key: string): Promise<OrchestrationTemplate> {
        if (Identifier.isIdentifier(key)) {
            this.currentId = key;
            return this.current();
        } else {
            return Promise.resolve(this.orchestrationTemplate)
        }
    }

    current(): Promise<OrchestrationTemplate> {
        let ot = this.orchestrationTemplate;
        if (ot && ot.id === this.currentId) {
            return Promise.resolve(ot);
        } else {
            return this.client.fetch(`templates/orchestrations/${this.currentId}`)
                .then(t => t.json() as any)
                .then(t => {
                    this.orchestrationTemplate = new OrchestrationTemplate(t);
                    this.subject.next(this.orchestrationTemplate);
                    return this.orchestrationTemplate;
                })
        }
    }

    public async link(id: string,
                      template: OrchestrationTemplate): Promise<OrchestrationTemplate> {
        return this.client.fetch(`templates/orchestrations/${id}/link`, {
            method: 'put',
            body: JSON.stringify(template.toJSON())
        }).then(t => t.json()).then(t => new OrchestrationTemplate(t));
    }

    currentGraph(): Promise<TaskGraph> {
        return this.client.fetch(`graph/orchestration-template/${this.currentId}`)
            .then(t => t.json())
            .then(t => {
                return new TaskGraph(t)
            })
    }

    async saveGraph(e: any): Promise<boolean> {
        e.type = 'io.sunshower.sdk.v1.graph.model.GraphElement';
        e['graph-type'] = 'orchestration-template';
        this.client.fetch(`graph/${this.currentId}`, {
            method: 'put',
            body: JSON.stringify(e)
        });
        return true;
    }

    
    getContents(id: string) : Promise<Content[]> {
        let query = {
            element: id,
            host: this.currentId,
            type: 'io.sunshower.sdk.v1.graph.model.VertexElement',
            'host-type': 'io.sunshower.sdk.v1.graph.model.GraphElement',
        };

        return this.client.fetch(`graph/${this.currentId}/contents`, {
            method: 'put',
            body: JSON.stringify(query)
        }).then(t => t.json() as any).then(t => t.map(u => new Content(u)).filter(u => !!u.name));
        
    }
    
    getProperties(content: Content) : Promise<Property[]> {
        return this.client.fetch('graph/properties/preview', {
            method: 'put',
            body: JSON.stringify(content)
        }).then(t => t.json() as any).then(t => t.map(u => new Property(u)));
    }

    getContent(id: string, name: string): Promise<Content> {
        let query = {
            element: id,
            host: this.currentId,
            type: 'io.sunshower.sdk.v1.graph.model.VertexElement',
            'host-type': 'io.sunshower.sdk.v1.graph.model.GraphElement',
            'content-name': name 
        };
        return this.client.fetch(`graph/${this.currentId}/content`, {
            method: 'put',
            body: JSON.stringify(query)
        }).then(t => t.json()).then(t => new Content(t));
    }

    saveContent(id: string, contents: Content): Promise<any> {
        let query = {
            element: id,
            host: this.currentId,
            type: 'io.sunshower.sdk.v1.graph.model.VertexElement',
            'host-type': 'io.sunshower.sdk.v1.graph.model.GraphElement',
            'content-name': contents.name
        };

        return this.client.fetch(`graph/${this.currentId}/content/save`, {
            method: 'put',
            body: JSON.stringify({
                data: {
                    reference: contents.reference,
                    value: contents.value,
                    'media-type': contents.mediaType,
                    type: 'reference',
                    name: contents.name
                },
                query: query
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    save(orchestrationTemplate: OrchestrationTemplate): Promise<Identifier> {
        return this.client.fetch('templates/orchestrations', {
            method: 'put',
            body: JSON.stringify(orchestrationTemplate)
        }).then(t => t.json() as any)
            .then(t => {
                return new Identifier(t.val);
            });
    }

    destroy(templateId: string): Promise<any> {
        return this.client.fetch(`templates/orchestrations/${templateId}`, {
            method: 'delete'
        }).then(t => t.json() as any);
    }

}