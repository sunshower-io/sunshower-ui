import {App} from '../../src/app';

class RouterStub {
  routes;
  
  configure(handler) {
    handler(this);
  }
  
  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var sut, mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Stormchaser');
  });

  it('should have a network route', () => {
    expect(sut.router.routes).toContain({ 
      route: 'network', 
      name: 'network',  
      moduleId: 'network/network', 
      nav: true, 
      title:'Network' });
  });

  it('should have a node route', () => {
     expect(sut.router.routes).toContain({ 
       route: 'node', 
       name: 'node', 
       moduleId: 'nodes/node', 
       title:'Node' 
     });
  });

  it('should have a redirect route', () => {
    expect(sut.router.routes)
        .toContain({ 
          route: '', 
          redirect: 'network'
        });
  });
});
