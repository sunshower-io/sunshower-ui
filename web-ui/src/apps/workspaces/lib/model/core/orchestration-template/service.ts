import {Service, ServiceManager} from "lib/common/service";
import {HttpClient} from "aurelia-fetch-client";
import {OrchestrationTemplate} from "./model";
import {Identifier} from "lib/common/lang/identifier";
import {Subject} from "rxjs/Subject";

export class OrchestrationTemplateService implements Service<OrchestrationTemplate> {

    public orchestrationTemplate    : OrchestrationTemplate;

    static readonly paramName       : string = 'orchestrationTemplateId';

    private currentId               : string;

    private subject                 : Subject<OrchestrationTemplate>;

    constructor(private client: HttpClient,
        private serviceManager: ServiceManager) {
        serviceManager.register(OrchestrationTemplateService.paramName, this);
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
            return this.client.fetch(`orchestrations/templates/${this.currentId}`)
                .then(t => t.json() as any)
                .then(t => {
                    this.orchestrationTemplate = new OrchestrationTemplate(t);
                    this.subject.next(this.orchestrationTemplate);
                    return this.orchestrationTemplate;
                })
        }
    }

    save(orchestrationTemplate: OrchestrationTemplate) : Promise<Identifier> {
        return this.client.fetch('templates/orchestrations', {
            method: 'put',
            body: JSON.stringify(orchestrationTemplate.toJSON())
        }).then(t => t.json() as any)
            .then(t => {
                return new Identifier(t.val);
            });
    }

    destroy(templateId: string) : Promise<any> {
        return this.client.fetch(`templates/orchestrations/${templateId}`, {
            method: 'delete'
        }).then(t => t.json() as any);
    }

}