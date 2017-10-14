import {} from 'jasmine';
import {UUID} from "lib/common/lang/uuid";
import {Base58} from "lib/common/util/base58";

describe('base58', () => {


    it('should encode a base58 byte correctly', () => {
        let uuid = Base58.encode(UUID.randomBytes());
        console.error("UUID", uuid);

    });


});
