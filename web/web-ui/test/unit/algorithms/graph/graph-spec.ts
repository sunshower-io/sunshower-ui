import {Graph, Node} from '../../../../src/algorithms/graph/graph';
import {TarjansStronglyConnectedComponents} from '../../../../src/algorithms/graph/tarjans';

function n(data:number) : Node<string> {
    return new Node('' + data, '' + data);
}

describe("tarjan's algorithm", () => {

    let graph:Graph<string>;
    beforeEach(() => {
        graph = new Graph<string>();
    });


    it('should detect a complex cycle', () => {
        graph.connect(n(0), n(1));
        graph.connect(n(0), n(3));
        graph.connect(n(1), n(2));
        graph.connect(n(1), n(4));
        graph.connect(n(2), n(0));
        graph.connect(n(2), n(6));
        graph.connect(n(3), n(2));
        graph.connect(n(4), n(5));
        graph.connect(n(5), n(6));
        graph.connect(n(5), n(7));
        graph.connect(n(5), n(8));
        graph.connect(n(5), n(9));
        graph.connect(n(6), n(4));
        graph.connect(n(7), n(9));
        graph.connect(n(8), n(9));
        graph.connect(n(9), n(8));

        let tarjans = new TarjansStronglyConnectedComponents();
        let components = tarjans.run(graph);

        for(let c of components) {
            console.log("Component: ", c.root.id);
            for(let cs of c.elements) {
                console.log("\t" + cs.id);
            }
        }
    });

    it('should not detect single components', () => {
        let a = new Node('a', 'this is a'),
            tarjans = new TarjansStronglyConnectedComponents();
        graph.add(a);
        let components = tarjans.run(graph);
        expect(components.length).toBe(0);
    });


    it('should detect a simple cycle', () => {
        let a = new Node<string>('a', 'this is a'),
            b = new Node<string>('b', 'this is b'),
            c = new Node<string>('c', 'this is c'),
            tarjans = new TarjansStronglyConnectedComponents();

        graph.connect(a, b);
        graph.connect(b, c);
        graph.connect(c, a);
        let component = tarjans.run(graph);
        expect(component.length).toBe(1);
        for(let c of component) {
            console.log(c);
        }
    });

});


describe('a graph', () => {

    let graph:Graph<string>;

    beforeEach(() => {
        graph = new Graph<string>();
    });

    it('should connect two edges correctly', () => {
        let source = new Node<string>('1', 'cool'),
            target = new Node<string>('2', 'beans');
        graph.connect(source, target);

        let neighbors = graph.neighbors(source);
        expect(neighbors.length).toBe(1);
        expect(neighbors[0]).toBe(target);
    });

    it('should connect many edges correctly', () => {
        for(let i = 0; i < 10; i++) {
            let source = new Node<string>('id' + i, '' + i);
            for(let j = 0; j < 10; j++) {
                let target = new Node<string>('jid' + j + '' + i, '' + i);
                graph.connect(source, target);
            }
        }
        for(let i = 0; i < 10; i++) {
            let source = graph.get('id' + i);
            expect(graph.neighbors(source).length).toBe(10);
        }
    })

});