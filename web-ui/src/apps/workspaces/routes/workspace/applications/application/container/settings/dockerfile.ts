/**
 * Created by dustinlish on 2/22/17.
 */

import * as ace from 'ace';
import {autoinject} from "aurelia-framework";
import {ApplicationService} from "common/model/api/application/service";


@autoinject
export class Dockerfile {

    private id                  : string;
    private workspaceId         : string;


    private editor              :HTMLElement;

    constructor(private applicationService: ApplicationService) {
        let a = ace as any;
        a.config.set('basePath', '/jspm_packages/github/ajaxorg/ace-builds@1.2.6');
    }

    refresh() : void {

        this.applicationService.open('Dockerfile')
            .then(t => {
                let editor = ace.edit('editor');
                editor.setTheme('ace/theme/clouds_midnight');
                editor.getSession().setMode('ace/mode/yaml');
                editor.setValue((t as any).text);
            }).catch(t => {
        });
    }

    attached() : void {
        this.refresh();
    }

}