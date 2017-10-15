import {autoinject, customElement} from "aurelia-framework";
import {bindable, containerless} from "aurelia-templating";
import {UUID} from 'lib/common/lang/uuid';
import {Terminal} from "terminal-js";

@autoinject
@containerless
@customElement('terminal-panel')
export class TerminalPanel {

    @bindable
    private controlId: string;

    constructor() {
        this.controlId = UUID.randomUUID().value;
    }

    attached() {
        let t = new Terminal({
            dom: document.getElementById(this.controlId), // required
            speed: 15 // chars per second
        });
        t.run(function (o) {
            o.output('Hi, there. I\'m Micoz. ').wait(300);
            o.del(3).output('oz. ').wait(1000);

            o.output('I want to show you an awesome simulator');
            o.del(9).output('terminal powered by HTML4').wait(200).del(1).output('5. ').wait(800);

            o.output('The terminal is a simulator with animation.').wait(800);
            o.newline();
            o.output('-- Micooz');
        });
    }


}