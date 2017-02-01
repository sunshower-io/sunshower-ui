import {} from 'jasmine';
import {Container} from 'aurelia-dependency-injection';
import {LocalStorage} from "storage/local/local-storage";
import {PreferenceManager} from "storage/application-state";

describe('application-state', () => {


    let container: Container = null,
        storage  : LocalStorage = null,
        preferenceManager : PreferenceManager = null;


    beforeEach(() => {
        container = new Container();
        preferenceManager = container.get(PreferenceManager);



    });


    it('should store a simple object into local storage correctly', () => {
        preferenceManager.put('main/workspace/draftboards/Draftboard', {
            leftToggled: true

        });

        expect(preferenceManager.get('main/workspace/draftboards/Draftboard').leftToggled).toBe(true);


    });

    it('should store re-saved objects into local storage correctly', () => {
        preferenceManager.put('main/workspace/draftboards/Draftboard', {
            leftToggled: true,
            rightToggled: true
        });

        preferenceManager.put('main/workspace/draftboards/Draftboard', {
            leftToggled: false,
            rightToggled: true
        });

        let ourResult = preferenceManager.get('main/workspace/draftboards/Draftboard');

        expect(ourResult.leftToggled).toBe(false);
        expect(ourResult.rightToggled).toBe(true)
    });
});