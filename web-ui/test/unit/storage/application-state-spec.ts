import {} from 'jasmine';
import {Container} from 'aurelia-dependency-injection';
import {LocalStorage} from 'common/lib/storage/local/local-storage';
import {PreferenceManager} from "common/lib/storage/application-state";

describe('application-state', () => {


    let container: Container = null,
        storage  : LocalStorage = null,
        preferenceManager : PreferenceManager = null,
        defaultValues : {},
        defaultPath: string;


    beforeEach(() => {
        container = new Container();
        preferenceManager = container.get(PreferenceManager);
        defaultValues = { leftToggled: true, rightToggled: true };
        defaultPath = 'main/workspace/draftboards/Draftboard';
    });

    it('should return the defaults if there are no saved preferences', () => {
        let ourResult = preferenceManager.get(defaultPath, defaultValues);

        console.log(JSON.stringify(preferenceManager.savedPreferences));

        expect(ourResult.leftToggled).toBe(true);
        expect(ourResult.rightToggled).toBe(true);
    });


    it('should store a simple object into local storage correctly', () => {
        preferenceManager.put(defaultPath, { leftToggled: false, rightToggled: false });
        let ourResult = preferenceManager.get(defaultPath, defaultValues);

        expect(ourResult.leftToggled).toBe(false);
        expect(ourResult.rightToggled).toBe(false);
    });

    it('should merge preferences correctly', () => {
        preferenceManager.put(defaultPath, { leftToggled: false });
        let ourResult = preferenceManager.get(defaultPath, defaultValues);

        expect(ourResult.leftToggled).toBe(false);
        expect(ourResult.rightToggled).toBe(true);
    });

});