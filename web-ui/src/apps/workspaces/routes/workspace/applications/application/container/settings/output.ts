import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {bindable} from "aurelia-framework";

import * as Terminal from "xterm"

/**
 * Created by dustinlish on 2/22/17.
 */

@autoinject
export class Output {

    lines:string[];

    @bindable
    terminal;

    constructor(private client:HttpClient) {

    }

    activate(items:any, p:any, c:any) : void {

    }

    attached() {
        var term = new Terminal({
            cursorBlink: true,
        });
        term.open(this.terminal);

        this.lines = [];
        let ls = docs.split('\n'),
            count = 0,
            interval = setInterval(() => {
                if(count < ls.length) {
                    term.writeln(ls[count]);
                    this.lines.push(ls[count]);
                } else {
                    return clearInterval(interval);
                }
                count++;

            }, 1000);
    }

}


let docs = `
 Digest: sha256:39d4b2f8d3f37bc1321b04ca9bca0681c6ba65ef5a8610793383710e3aecf8b5
 Digest: sha256:39d4b2f8d3f37bc1321b04ca9bca0681c6ba65ef5a8610793383710e3aecf8b5
 Digest: sha256:39d4b2f8d3f37bc1321b04ca9bca0681c6ba65ef5a8610793383710e3aecf8b5
 Digest: sha256:39d4b2f8d3f37bc1321b04ca9bca0681c6ba65ef5a8610793383710e3aecf8b5
 Digest: sha256:39d4b2f8d3f37bc1321b04ca9bca0681c6ba65ef5a8610793383710e3aecf8b5
 Digest: sha256:39d4b2f8d3f37bc1321b04ca9bca0681c6ba65ef5a8610793383710e3aecf8b5
 Digest: sha256:39d4b2f8d3f37bc1321b04ca9bca0681c6ba65ef5a8610793383710e3aecf8b5
`;