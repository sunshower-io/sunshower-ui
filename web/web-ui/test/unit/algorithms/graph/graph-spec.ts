import {} from 'jasmine';
import * as _ from 'lodash';
import {Graph, Node, copy} from 'algorithms/graph/graph';
import {TopologicalSort, ParallelSchedule, CGraph} from "algorithms/graph/scheduling";
import {TarjansStronglyConnectedComponents} from 'algorithms/graph/tarjans';

function n(data: number): Node<string> {
    return new Node('' + data, '' + data);
}
function s(d: string): Node<string> {
    return new Node<string>(d, d);
}

const values =
        `des_system_lib   std synopsys std_cell_lib des_system_lib dw02 dw01 ramlib ieee
  dw01             ieee dw01 dware gtech
  dw02             ieee dw02 dware
  dw03             std synopsys dware dw03 dw02 dw01 ieee gtech
  dw04             dw04 ieee dw01 dware gtech
  dw05             dw05 ieee dware
  dw06             dw06 ieee dware
  dw07             ieee dware
  dware            ieee dware
  gtech            ieee gtech
  ramlib           std ieee
  std_cell_lib     ieee std_cell_lib
  synopsys`
    ;

const items = values.split('\n').map(e => e.split(' ').filter(j => j != ''));


function buildGraph(graph: Graph<string>): Graph<string> {
    for (let line of items) {
        if (line.length > 0) {
            let source = s(line[0]),
                targets = line.slice(1).map(t => s(t));
            for (let target of targets) {
                graph.connect(source, target);
            }
        }
    }
    return graph;
}

describe('a parallel schedule', () => {

    let graph: Graph<string>;

    beforeEach(() => {
        graph = new Graph<string>();
    });

    it('should find roots correctly', () => {
        let ps = new ParallelSchedule(),
            roots = ps.roots(buildGraph(graph).nodes);

        expect(roots.length).toBe(3);

    });
});


describe('a graph', () => {
    let graph: Graph<string>;

    beforeEach(() => {
        graph = new Graph<string>();
    });

    it('should be copied over correctly', () => {
        graph.connect(n(1), n(2));
        let clone = copy(graph, new Graph<string>(), e => e);
        expect(Object.keys(clone.nodes).length).toBe(2);
    });

    it('should copy a complex graph correctly', () => {
        let original = buildGraph(graph),
            clone = copy(original, new Graph<string>(), e => e);
        expect(
            Object.keys(original.nodes).length
        ).toEqual(Object.keys(clone.nodes).length);
    });

});

describe("tarjan's algorithm", () => {

    let graph: Graph<string>;

    beforeEach(() => {
        graph = new Graph<string>();
    });

    it('should compute the task dependencies of a simple graph', () => {
        graph.connect(s('b'), s('a'));
        graph.connect(s('c'), s('a'));
        graph.connect(s('d'), s('b'));
        graph.connect(s('f'), s('e'));
        let ps = new ParallelSchedule(),
            seqs = ps.run(graph);

        expect(seqs.length).toBe(3);

        expect(seqs[0].elements.map(e => e.id)).toEqual(['a', 'e']);
        expect(seqs[1].elements.map(e => e.id)).toEqual(['b', 'c', 'f']);
        expect(seqs[2].elements.map(e => e.id)).toEqual(['d']);

    });

    it('should compute the task dependencies of a complex graph', () => {
        let g = buildGraph(graph),
            ps = new ParallelSchedule(),
            seqs = ps.run(g);
        expect(seqs.length).toBe(4);

        expect(seqs[0].elements.map(e => e.id))
            .toEqual(['std', 'synopsys', 'ieee']);

        expect(seqs[1].elements.map(e => e.id))
            .toEqual(['std_cell_lib', 'ramlib', 'dware', 'gtech']);

        expect(seqs[2].elements.map(e => e.id))
            .toEqual(['dw02', 'dw01', 'dw05', 'dw06', 'dw07']);

        expect(seqs[3].elements.map(e => e.id))
            .toEqual(['des_system_lib', 'dw03', 'dw04']);

    });

    it('should compute the level sets of the dependencies', () => {
        let g = buildGraph(graph),
            ps = new ParallelSchedule(),
            clone = ps.pluck(g),
            keyspace = ps.computeKeyspace(clone);
        let ordered = ps.roots(clone.nodes, {}),
            ordered1 = ordered.map(n => n.id);
        expect(ordered1).toEqual(['std', 'synopsys', 'ieee']);
        let existing = {'std': true, 'synopsys': true, 'ieee': true};
        ps.updateAdjacencies(clone, ordered);
        ordered = ps.roots(clone.nodes, existing);
        ordered1 = ordered.map(n => n.id);
        expect(ordered1).toEqual([ 'std_cell_lib', 'ramlib', 'dware', 'gtech' ])
    });


    it('should compute the total keyspace', () => {
        let ps = new ParallelSchedule(),
            ks = ps.computeKeyspace(buildGraph(graph)),
            kskeys = ks.map(e => e.id),
            expected =[ 'des_system_lib', 'std', 'synopsys', 'std_cell_lib', 'dw02', 'dw01', 'ramlib', 'ieee', 'dware', 'gtech', 'dw03', 'dw04', 'dw05', 'dw06', 'dw07' ];
        expect(kskeys).toEqual(expected);
    });


    it('should yield the roots for a simple graph', () => {
        graph.connect(n(1), n(2));
        graph.add(n(3));

        let ts = new ParallelSchedule(),
            r = ts.roots(graph.nodes),
            v = r.map(n => n.id);
        expect(v).toEqual(['2', '3']);
    });

    it('should yield an execution order for a task set', () => {
        let tsort = new ParallelSchedule(),
            results = tsort.run(graph);
        for (let seq of results) {
            console.log("SEQ", _.values(seq.elements).map(e => e.id));
        }
    });


    it('should yield the expected simple dependency graph', () => {
        let g = buildGraph(graph),
            tsort = new ParallelSchedule(),
            results = tsort.roots(g.nodes).map(d => d.id);
        expect(results).toEqual(['std', 'synopsys', 'ieee']);


    });

    it('should yield a correct topological order for an acyclic graph', () => {
        graph.connect(n(5), n(11));
        graph.connect(n(7), n(11));
        graph.connect(n(7), n(8));
        graph.connect(n(3), n(8));
        graph.connect(n(3), n(10));
        graph.connect(n(11), n(2));
        graph.connect(n(11), n(9));
        graph.connect(n(11), n(10));
        graph.connect(n(8), n(9));


        // let tarjans = new TarjansStronglyConnectedComponents(),
        //     result = tarjans.run(graph),
        //     results = result.sort(),
        //     labels = _.map(results, results => results.id);
        // console.log("LABELS", labels);


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

        let tarjans = new TarjansStronglyConnectedComponents(),
            result = tarjans.run(graph),
            components = result.components;

        expect(result.hasCycles()).toBe(true);

        for (let c of components) {
            console.log("Component: ", c.root.id);
            for (let cs of c.elements) {
                console.log("\t" + cs.id);
            }
        }

    });

    it('should not detect single components', () => {
        let a = new Node('a', 'this is a'),
            tarjans = new TarjansStronglyConnectedComponents();
        graph.add(a);
        let components = tarjans.run(graph).components;
        expect(components.length).toBe(1);
    });


    it('should detect a simple cycle', () => {
        let a = new Node<string>('a', 'this is a'),
            b = new Node<string>('b', 'this is b'),
            c = new Node<string>('c', 'this is c'),
            tarjans = new TarjansStronglyConnectedComponents();

        graph.connect(a, b);
        graph.connect(b, c);
        graph.connect(c, a);
        let result = tarjans.run(graph),
            component = result.components;
        expect(result.hasCycles()).toBe(true);
        expect(component.length).toBe(1);

        for (let c of component) {
            console.log(c);
        }
    });

});


describe('a graph', () => {

    let graph: Graph<string>;

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
        for (let i = 0; i < 10; i++) {
            let source = new Node<string>('id' + i, '' + i);
            for (let j = 0; j < 10; j++) {
                let target = new Node<string>('jid' + j + '' + i, '' + i);
                graph.connect(source, target);
            }
        }
        for (let i = 0; i < 10; i++) {
            let source = graph.get('id' + i);
            expect(graph.neighbors(source).length).toBe(10);
        }
    })
});