

import {
    Router,
    RouterConfiguration
} from "aurelia-router";

import {Form} from '../../form/form'
import {inject} from "aurelia-dependency-injection";

@inject(Form)
export class Infrastructure {

    constructor(private form: Form) {
        this.form = form;
    }

    attached() {
        $('.ui.selection.dropdown').dropdown();
    }

    create() {
        console.log('create button clicked');
    }
    // public router:Router;
    //
    // public configureRouter(config:RouterConfiguration, router:Router) {
    //     config.map([
    //         // {
    //         //     route: ['', 'credentials'],
    //         //     name: 'credentials',
    //         //     moduleId: './credentials/credentials',
    //         //     nav: true,
    //         //     title: 'credentials'
    //         // },
    //         // {
    //         //     route: 'projects',
    //         //     name: 'projects',
    //         //     moduleId: './projects/projects',
    //         //     nav: true,
    //         //     title: 'projects'
    //         // }
    //     ]);
    //     this.router = router;
    // }
}