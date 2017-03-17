/**
 * Created by dustinlish on 2/22/17.
 */

import * as ace from 'ace';
export class Dockerfile {

    private editor:HTMLElement;

    constructor() {
        let a = ace as any;
        a.config.set('basePath', '/dev/jspm_packages/github/ajaxorg/ace-builds@1.2.6');
    }

    attached() : void {
        let editor = ace.edit('editor');
        editor.setTheme('ace/theme/clouds_midnight');
        editor.getSession().setMode('ace/mode/yaml');
    }

}