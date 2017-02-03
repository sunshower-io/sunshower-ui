import {inject} from "aurelia-framework";
import {User} from "model/core/security/user";
import {Element} from "canvas/element/element";
import {LocalStorage} from "./local/local-storage";



export type ViewState = LocalStorage;

export type Preferences = JSON;

@inject(LocalStorage)
export class PreferenceManager {

    private preferences: Preferences;

    private savedPreferences: any;

    constructor(private localStorage: LocalStorage) {
        this.savedPreferences = []
    }

    preference(key:string) : any {
        for (let prefs of this.savedPreferences) {
            if (prefs.key === key) {
                return prefs
            }
        }
    }

    put(key:string, value:any) : void {
        let thisPreference = this.preference(key);
        if (thisPreference) {
            thisPreference.value = value;
        } else {
            this.savedPreferences.push({key: key, value: value});
        }
    }

    get(key:string, defaults:any) : any {
        let thisPreference = this.preference(key),
            savedPrefs = thisPreference ? thisPreference.value : {},
            mergedPrefs = {};

        for (let key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                mergedPrefs[key] = key in savedPrefs ? savedPrefs[key] : defaults[key];
            }
        }

        this.put(key, mergedPrefs);
        return mergedPrefs;
    }

}

export default class ApplicationState {

    currentUser: User;

    currentElement: Element;
}

