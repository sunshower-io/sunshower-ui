import {Service, ServiceManager} from "lib/common/service";
import {HttpClient} from "aurelia-fetch-client";
import {OrchestrationTemplate} from "./model";
import {Identifier} from "lib/common/lang/identifier";
import {Subject} from "rxjs/Subject";
import {autoinject} from "aurelia-framework";
import {TaskGraph} from "lib/designer/model/graph/graph-element";

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
               template: OrchestrationTemplate
    ): Promise<OrchestrationTemplate> {
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

    saveGraph(e: any): Promise<boolean> {
        e.type = 'io.sunshower.sdk.v1.graph.model.GraphElement';
        e['graph-type'] = 'orchestration-template';
        return this.client.fetch(`graph/${this.currentId}`, {
            method: 'put',
            body: JSON.stringify(e)
        }).then(t => true);
    }


    getContent(id: string): Promise<string> {
        return this.client.fetch(`graph/${this.currentId}/${id}/content?type=orchestration-template`, {
            method: 'get',
            headers: {
                'accept': 'text/plain',
            }
        }).then(t => t.text());
    }

    saveContent(id: string, content: string): Promise<any> {
        return this.client.fetch(`graph/${this.currentId}/${id}/content?type=orchestration-template`, {
            method: 'put',
            body: content,
            headers: {
                'content-type': 'text/plain'
            }
        });
    }

    save(orchestrationTemplate: OrchestrationTemplate): Promise<Identifier> {
        return this.client.fetch('templates/orchestrations', {
            method: 'put',
            body: JSON.stringify(orchestrationTemplate.toJSON())
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