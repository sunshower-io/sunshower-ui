/**
 * Created by dustinlish on 3/28/17.
 */

import * as ace from 'ace';
import {autoinject} from "aurelia-framework";
import {NavigationInstruction} from "aurelia-router";
import {HttpClient} from "aurelia-fetch-client";


@autoinject
export class Compose {

    private id: string;
    private workspaceId: string;


    private editor:HTMLElement;

    constructor(private client:HttpClient) {
        let a = ace as any;
        a.config.set('basePath', '/jspm_packages/github/ajaxorg/ace-builds@1.2.6');
    }

    private path() : string {
        return `workspaces/${this.workspaceId}/applications/${this.id}`
    }

    refresh() : void {
        let editor = ace.edit('editor');
        // editor.setTheme('ace/theme/clouds_midnight');
        editor.getSession().setMode('ace/mode/yaml');

        var yaml = `
version: '3'

services:

  proxy-dev:
    container_name: "proxy-dev"
    image: "nginx:1.11.1"
    ports:
      - "32770:80"
      - "32771:443"
    links:
      - hasli-ui-dev
      - hasli-web-dev
    volumes:
      - ./nginx/nginx.dev.conf:/etc/nginx/nginx.conf:ro

  hasli-web-dev:
    container_name: "hasli-web-dev"
    image: "hasli-web/web:latest"

  hasli-ui-dev:
    container_name: "hasli-ui-dev"
    image: "hasli-ui/ui-dev:latest"
    volumes:
      - ../:/usr/src/
      - ~/.jspm:/root/.jspm
      - ~/.gradle/wrapper:/root/.gradle/wrapper
        `;

        editor.setValue(yaml, -1);
    }

    attached() : void {
        this.refresh();
    }

    activate() {
    }

}