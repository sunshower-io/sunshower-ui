/**
 * Created by dustinlish on 2/22/17.
 */

import * as ace from 'ace';
import {autoinject} from "aurelia-framework";
import {ApplicationService} from "common/model/api/application/service";
import Editor = AceAjax.Editor;


@autoinject
export class Dockerfile {

    private editor       : HTMLElement;
    private aceEditor    : Editor;

    constructor(private applicationService: ApplicationService) {
        let a = ace as any;
        a.config.set('basePath', '/jspm_packages/github/ajaxorg/ace-builds@1.2.6');
    }

    refresh() : void {

        this.applicationService.open('Dockerfile')
            .then(t => {
                this.aceEditor.setValue((t as any).text, -1);
            }).catch(t => {
        });
    }

    attached() : void {
        this.aceEditor = ace.edit('editor');
        this.aceEditor.setTheme('ace/theme/xcode');
        this.aceEditor.getSession().setMode('ace/mode/dockerfile');
        this.refresh();
    }

}