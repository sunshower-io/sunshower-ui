import {} from 'jasmine';
import {UUID} from "src/utils/uuid";

import {App} from 'src/main/main';
import {AuthenticationContextHolder} from 'src/storage/local/local-storage'

describe('it must be a uuid', () => {
    it('must do uuid things', () => {
        console.log(UUID.randomUUID());
    })

    it('must be constructable', () => {
        let app = new App(null);
    })

});