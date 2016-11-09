/**
 * Created by dustinlish on 10/25/16.
 */

import {Wizard} from './wizard'
import {inject} from "aurelia-dependency-injection";

@inject(Wizard)
export class Dashboard {

    private wizard: Wizard;

    constructor(wizard: Wizard) {
        this.wizard = wizard;
    }

    create() {
        console.log('create button clicked');
        this.wizard.show();
    }

}