import {autoinject, customElement} from "aurelia-framework";
import {bindable, containerless} from "aurelia-templating";
import {UUID} from 'lib/common/lang/uuid';
import * as Terminal from 'xterm';
import 'xterm/dist/addons/fit/fit';
import 'xterm/dist/xterm.css!';

@autoinject
@containerless
@customElement('terminal-panel')
export class TerminalPanel {

    @bindable
    private controlId: string;
    
    private element: HTMLElement;

    constructor() {
        this.controlId = UUID.randomUUID().value;
    }

    attached() {
        let a = new Terminal();
        // (Terminal as any).loadAddon('fit');
        a.open(this.element);
        a.writeln("Frapper");
        (a as any).fit();
        // a.write('Hello from \033[1;3;31mxterm.js\033[0m $ ')
    }


}