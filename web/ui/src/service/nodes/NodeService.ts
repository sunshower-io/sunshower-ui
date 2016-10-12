import {Hash} from '../../utils/Hash';

export class Node {

    id: string;
    
    name:string;
    
    osType: string;
    
    dnsNames: Array<String>;
    
    ipAddresses:Array<String>;
  
    
   
    weight = 4;
    
    color  = '#10A2DD';
    shape = 'ellipse';
    
   
    classes: string;
    
    constructor(ip:string, id:string, osType:string) {
        this.id = id;
        this.dnsNames = [];
        this.osType = osType;
        this.name = id;
        this.ipAddresses = [ip];
        this.classes = osType;
    }
}

export class NodeService {
    private elements = {};

    
    constructor() {
    }
    save(n:Node):void {
        this.elements[n.id] = n;
    }

    getElements():Array<Node> {
        let results = [];
        for(let k in this.elements) {
            if(this.elements.hasOwnProperty(k)) {
                results.push(this.elements[k]);
            }
        }
        return results;
    }

    getElement(id:string) {
        return this.elements[id];
    }

    getElementByIp(ips:Array<string>) {
    }

}

export class Nodes {
    
    
    public static getNode() : Node {
        return Nodes.node || new Node('10.10.10.10', Hash.createId(), 'linux');
    }
    
    public static setNode(n:Node) : void {
        Nodes.node = n;
    }


    static node:Node;
    static Nodes = new Nodes();

    private nodeService:NodeService;

    constructor() {
        this.nodeService =
            new NodeService();
        for(var i = 0; i < 20; ++i) {
            this.nodeService.save(Nodes.createNode(i));
        }
    }
   
    
    public static getNodeService() : NodeService {
        return Nodes.Nodes.nodeService;
    }

    static createNode(i:number) : Node {
        return new Node(
            `10.10.4.${i}`,
            Hash.createId(),
            i % 2 ? 'windows'  : 'linux'
        );
    }

}

