import {inject} from "aurelia-framework";
import {User} from "model/core/security/user";
import {Element} from "canvas/element/element";
import {LocalStorage} from "./local/local-storage";



export type ViewState = LocalStorage;

export type Preferences = JSON;

@inject(LocalStorage)
export class PreferenceManager {

    private preferences: Preferences;

    constructor(private localStorage: LocalStorage) {

    }

    put(key:string, value:any) : void {
        this.localStorage.put(key, JSON.stringify(value));
    }

    get(key:string) : any {
        return JSON.parse(this.localStorage.get(key));
    }

}

export default class ApplicationState {

    currentUser: User;

    currentElement: Element;
}

