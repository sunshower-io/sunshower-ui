import {Marshaller} from "io/marshalling/marshaller";
import {Draftboard} from "component/draftboard/draftboard";
import {
    TarjansStronglyConnectedComponents
} from "algorithms/graph/tarjans";
import {Properties, Element} from "canvas/element/element";
import {Vertex, Edge} from "algorithms/graph/graph";
import {Class} from "lang/class";
import {ApplicationDeployment} from "component/model/deployment";
import {InfrastructureNode} from "component/model/infrastructure-node";
import {UUID} from "utils/uuid";


export class ApplicationDeploymentMarshaller implements Marshaller<ApplicationDeployment> {
    write(data: ApplicationDeployment): {} {
        return {
            id: data.id,
            type: 'ApplicationDeployment',
            payload: {
                deployer: 'docker',
                id: data.applicationId,
                name: data.applicationName
            }
        }
    }
}

export class InfrastructureNodeMarshaller implements Marshaller<InfrastructureNode> {
    write(data: InfrastructureNode): {} {
        return {
            id: data.id,
            type: 'InfrastructureNode',
            payload: {}
        }
    }
}


export default class DraftboardMarshaller implements Marshaller<Draftboard> {

    static readonly marshallers: Map<Class<Element>, Marshaller<Element>> = new Map();

    static register(element: Class<Element>, marshaller: Marshaller<Element>): void {
        DraftboardMarshaller.marshallers.set(element, marshaller);
    }


    static registerDefaults(): void {
        DraftboardMarshaller.register(ApplicationDeployment, new ApplicationDeploymentMarshaller());
        DraftboardMarshaller.register(InfrastructureNode, new InfrastructureNodeMarshaller());
    }

    write(data: Draftboard): {} {
        let tarjans = new TarjansStronglyConnectedComponents(),
            results = tarjans.run(data);
        if (results.hasCycles()) {
            throw new Error("Cycles detected" + results.getCycles());
        }
        return this.writeValues(data);
    }

    private writeValues(data: Draftboard): {} {
        let
            nodes = [],
            edges = [],
            marked = {};

        for (let k in data.nodes) {
            let node = data.nodes[k];
            nodes.push(this.writeNode(node));
            for (let ak in node.adjacencies) {
                edges.push(this.writeEdge(node.adjacencies[ak]));
            }
        }

        return {
            id: data.id,
            name: data.name,
            type: 'draftboard',
            description: data.description,
            graph: {
                nodes: nodes,
                edges: edges
            }
        };
    }


    private writeNode(node: Vertex<Properties>): {} {
        let marshaller = DraftboardMarshaller.marshallers
            .get(node.constructor as Class<Element>);
        if (!marshaller) {
            throw new Error("Unable to find marshaller for type: " + typeof marshaller);
        }
        return marshaller.write(node as Element);
    }

    private writeEdge(edge: Edge<Properties>) {
        return {
            source: edge.target.id,
            target: edge.source.id,
            relation: 'run-after',
            direction: 'out'
        }
    }
}

DraftboardMarshaller.registerDefaults();
