import {} from 'jasmine';
import {UUID} from "utils/uuid";

import {App} from 'main/main';
import {AuthenticationContextHolder} from 'storage/local/local-storage'

describe('it must be a uuid', () => {
    it('must do uuid things', () => {
        console.log(UUID.randomUUID());
    });

    it('must be constructable', () => {
        let app = new App(null);
        expect(app).not.toBe(null);
    });

    it('must parse its value from a string correctly', () => {
        let value = '0bd76cd3-3a3e-44c4-b91d-db3ed079186c';
        let uuid = UUID.fromString(value);
        expect(value).toBe(uuid.value);
    });


});