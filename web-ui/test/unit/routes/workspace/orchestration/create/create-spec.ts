import {} from 'jasmine';
import {Container} from "aurelia-dependency-injection";
import {CreateOrchestration} from "apps/workspaces/routes/workspace/orchestration/create/create";

describe('an orchestration creator VM', () => {

    let container: Container,
        orchestration: CreateOrchestration;

    beforeEach(() => {
        container = new Container();
        orchestration = container.get(CreateOrchestration);
    });


    it('should be created and injected correctly', () => {
        expect(orchestration).toBeDefined();
    });

    it('should correctly validate a complete version', () => {
        let versionString = '1.0.0-SNAPSHOT',
            valid = orchestration.validate(versionString);
        expect(valid).toBeTruthy();
    });


    it('should not error out when provided undefined', () => {
        let versionString = undefined,
            valid = orchestration.validate(versionString);
        expect(valid).toBeFalsy();
    });

    it('should not error out when provided null', () => {
        let versionString = null,
            valid = orchestration.validate(versionString);
        expect(valid).toBeFalsy();
    });

    it('should set versionValidationClass on the VM to black when the stringVersion is blank while returning false', () => {
        let versionString = '';
        orchestration['stringVersion'] = versionString;
        let result = orchestration.versionValid();
        let vstring = orchestration['stringVersion'],
            vclass = orchestration['versionValidationClass'];

        expect(vclass).toBe('');
        expect(vstring).toBe('');
        expect(result).toBeFalsy();
    });


    it('should set the class to "valid" when the version string is valid', () => {

        let versionString = '1341234.13414314.131434-snapshot';
        orchestration['stringVersion'] = versionString;
        let result = orchestration.versionValid();
        let vstring = orchestration['stringVersion'],
            vclass = orchestration['versionValidationClass'];

        expect(vclass).toBe('valid');
        expect(vstring).toBe(versionString);
        expect(result).toBeTruthy();
    });
});