import {} from 'jasmine';
import {CookieStorage, LocalStorage, createStorage} from 'common/lib/storage/local/local-storage';


describe('cookie storage', () => {

    it('should store a key correctly', () => {

        let storage = new CookieStorage();
        storage.put("hello", "world");
        expect(storage.get("hello")).toEqual("world");
    });


    it('should remove a key correctly', () => {
        let storage = new CookieStorage();
        storage.put("hello", "world");
        storage.remove("hello");
        expect(storage.get("hello")).toBeUndefined();
    });

    it('should contain a cookie on the local document', () => {
        document.cookie = "frap=dap";
        let storage = new CookieStorage();
        expect(storage.get("frap")).toEqual("dap");
    })


});

describe('local storage', () => {

    it('should store a key correctly', () => {
        let storage = new LocalStorage();
        storage.put("hello", "world");
        expect(storage.get("hello")).toEqual("world");
    });


    it('should remove a key correctly', () => {
        let storage = new LocalStorage();
        storage.put("hello", "world");
        storage.remove("hello");
        expect(storage.get("hello")).toBeNull();
    });

    it('should contain a cookie on the local document', () => {
        localStorage.setItem("frap", "dap");
        let storage = new LocalStorage();
        expect(storage.get("frap")).toEqual("dap");
    });

    it('should return the correct storage', () => {
        expect(createStorage()).not.toBeNull();
    })


});

