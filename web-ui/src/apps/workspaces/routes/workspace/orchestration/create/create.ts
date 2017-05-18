import {UUID} from "lib/common/lang/uuid";
import {bindable, autoinject} from "aurelia-framework";
import {DialogController} from "aurelia-dialog";
import {Router} from "aurelia-router";
import {OrchestrationTemplate, Version} from "apps/workspaces/lib/model/core/orchestration-template";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace/service";

@autoinject
export class CreateOrchestration {

    private nameId: string = UUID.random();
    private descriptionId: string = UUID.random();
    private versionId: string = UUID.random();

    private stringVersion: string;
    private versionValidationClass: string;

    @bindable
    private error: string;


    @bindable
    private orchestrationTemplate: OrchestrationTemplate;

    constructor(private controller:DialogController,
        private workspaceService:WorkspaceService,
        private router:Router) {
        this.orchestrationTemplate = new OrchestrationTemplate();
        this.orchestrationTemplate.version = new Version({
            major: 1,
            minor: 0,
            "minor-minor": 0,
            extension: "DRAFT"});
        this.stringVersion = this.orchestrationTemplate.version.name();
    }

    activate() {
        setTimeout(() => {
            Materialize.updateTextFields();
        }, 100);
    }

    versionValid() : boolean {
        //todo make this less lame
        if(this.stringVersion) {
            let nums = this.stringVersion.split('.');
            if(nums[2]) {
                let nums2 = nums[2].split('-'),
                    major = nums[0],
                    minor = nums[1];
                if (nums2[1]) {
                    let minorMinor = nums2[0],
                        extension = nums2[1],
                        numRegex = new RegExp("^(0|[1-9][0-9]*)$");
                    if (major.match(numRegex) && minor.match(numRegex) && minorMinor.match(numRegex)) {
                        this.versionValidationClass = 'valid';
                        return true;
                    } else {
                        return this.setVersionInvalid();
                    }
                } else {
                    return this.setVersionInvalid();
                }
            } else {
                return this.setVersionInvalid();
            }
        } else {
            this.versionValidationClass = '';
            return false;
        }
    }

    setVersionInvalid() : boolean {
        this.versionValidationClass = 'invalid';
        return false;
    }

    formattedVersion() : Version {
        let nums = this.stringVersion.split('.'),
            major = nums[0],
            minor = nums[1],
            temp = nums[2].split('-'),
            minorMinor = temp[0],
            extension = temp[1];
        return new Version({
            major: major,
            minor: minor,
            "minor-minor": minorMinor,
            extension: extension
        });
    }

    save() {
        if (this.versionValid()) {
            this.error = '';
            this.orchestrationTemplate.key = this.orchestrationTemplate.name;
            this.orchestrationTemplate.version = this.formattedVersion();
            this.workspaceService.addTemplate(this.workspaceService.workspace.id, this.orchestrationTemplate)
                .catch(err => {
                    this.error = err.statusText;
                }).then(result => {
                    if(result) {
                        this.complete();
                        this.router.navigate(`workspaces/${this.workspaceService.workspace.id}/orchestration/${result.value}`)
                    }
            });
        } else {
            this.error = "Please enter a valid version name. We recommend something like 1.0.0-DRAFT."
        }

    }

    complete() {
        this.controller.ok();
    }
}