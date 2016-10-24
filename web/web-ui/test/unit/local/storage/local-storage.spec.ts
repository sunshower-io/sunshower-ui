import {CookieStorage, LocalStorage, createStorage} from '../../../../src/storage/local/local-storage';


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

// import {App} from '../../src/app';
//
// class RouterStub {
//   routes;
//
//   configure(handler) {
//     handler(this);
//   }
//
//   map(routes) {
//     this.routes = routes;
//   }
// }
//
// describe('the App module', () => {
//   var sut, mockedRouter;
//
//   beforeEach(() => {
//     mockedRouter = new RouterStub();
//     sut = new App();
//     sut.configureRouter(mockedRouter, mockedRouter);
//   });
//
//   it('contains a router property', () => {
//     expect(sut.router).toBeDefined();
//   });
//
//   it('configures the router title', () => {
//     expect(sut.router.title).toEqual('Aurelia');
//   });
//
//   it('should have a welcome route', () => {
//     expect(sut.router.routes).toContain({ route: ['','welcome'], name: 'welcome',  moduleId: 'welcome', nav: true, title:'Welcome' });
//   });
//
//   it('should have a users route', () => {
//      expect(sut.router.routes).toContain({ route: 'users', name: 'users', moduleId: 'users', nav: true, title:'Github Users' });
//   });
//
//   it('should have a child router route', () => {
//     expect(sut.router.routes).toContain({ route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title:'Child Router' });
//   });
// });
