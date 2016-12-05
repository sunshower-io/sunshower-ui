import {OperatingSystem} from '../../../model/hal/api';
import {HttpClient} from "aurelia-fetch-client";
import {User} from '../../../model/core/security/user';
import {CredentialSecret, Secrets} from "../../../model/core/secret/credentials";
import {bindable, inject} from 'aurelia-framework'

import * as $ from 'jquery';
import 'pnotify';

@inject(HttpClient, User)
export class NodeConfigurations {

    private credentials = [];

    @bindable
    private newCredential = false;

    @bindable
    private newSecurityGroup = false;

    @bindable
    private newNodeConfiguration = false;

    @bindable
    private activeStep = 1;

    @bindable
    private secret:CredentialSecret;

    @bindable
    private operatingSystems: Array <OperatingSystem>;

    @bindable
    private steps: Array <Object>;

    constructor (private client:HttpClient, private user:User) {
        this.operatingSystems = [];
        this.operatingSystems.push(new OperatingSystem("Windows", "windows", 'this is a description of the Windows OS'));
        this.operatingSystems.push(new OperatingSystem("Linux", "linux", 'this is a description of the Linux OS'));


        this.steps = [];
        this.steps.push({step: 1, icon: 'disk outline', title: 'Hardware', description: 'Specify CPUs, Memory and Disk Space'});
        this.steps.push({step: 2, icon: 'linux', title: 'Operating System', description: 'Choose Operating System'});
        this.steps.push({step: 3, icon: 'code', title: 'Software', description: 'Choose applications to include'});
        this.steps.push({step: 4, icon: 'lock', title: 'Security', description: 'Set credentials and security groups'});
    }

    attached() {
        this.fetch();
    }

    fetch() {
        this.client.fetch(`secrets/vault/${Secrets.Credential}/list`)
            .then(response => response.json())
            .then(r => {
                console.log("test", r);
                this.credentials = r;
                this.newCredential = false;
            });

    }

    addNodeConfiguration() {
        this.showPNotify("frap", "adap");
        this.newNodeConfiguration = true;
    }

    changeNodeConfigurationStep(newStepNumber) {
        this.activeStep = newStepNumber;
    }

    saveNodeConfiguration() {
        this.newNodeConfiguration = false;
        this.activeStep = 1;
        this.showPNotify('boop', 'the woop');

    }

    cancelNodeConfiguration() {
        this.newNodeConfiguration = false;
        this.newCredential = false;
        this.newSecurityGroup = false;
        this.activeStep = 1;
        this.showPNotify('Node Configuration Cancelled', '');
    }

    addSecurityGroup() {
        this.newSecurityGroup = true;
    }

    saveSecurityGroup() {
        this.newSecurityGroup = false;
        //TODO pnotify
    }

    addCredential() {
        this.newCredential = true;
        this.secret = new CredentialSecret();
        this.secret.user = this.user;
    }

    saveCredential() {
        console.log(this.client.defaults.headers);
        this.client.fetch('secrets/vault', {
            method:'post',
            body:JSON.stringify(this.secret)
        })
            .then(response => response.json())
            .then(data => {
                this.fetch();
            });
        //TODO pnotify
    }



    showPNotify(title, text) {



        // var notice = new PNotify({
        //     title: "Frap",
        //
        //     text: text,
        //     buttons: {
        //         closer: false,
        //         sticker: false
        //     }
        // });
        // //
        // // notice.open();
        //
        // console.log("Pnotify");
        // notice.get().click(function() {
        //     notice.remove();
        // });

    }

}