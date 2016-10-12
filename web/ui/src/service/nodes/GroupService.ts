
import {Node} from "./NodeService";

export class Group {
    
    leader:Node;
    
    constructor(
        public id:string,
        public name:string, 
        private nodes:Array<Node> = [],
        public color:string = '#FFFF00'
    ) {
        
        
    }
    
    add(node:Node) : void {
        this.nodes.push(node);
    }
    
    
    getLeader() : Node {
        return this.leader;
        
    }
    
    getNodes() : Array<Node> {
        return this.nodes;
    }
}

export class GroupService {
    
    private groups:Map<string, Group>;
    
    constructor() {
        this.groups = new Map<string, Group>();
    }
    
    get(id:string) : Group {
        return this.groups[id];
    }
    
    getNodes(id:string) : Array<Node> {
        let group = 
            this.groups[id];
        return group != null ? group.nodes() : [];
    }
    
    add(group:Group) : void {
        if(!this.groups[group.id]) {
            this.groups[group.id] = group;
        }
    }
    
    list() : Array<Group> {
        return Object.keys(this.groups).map(k => this.groups[k]);
    }
    
    
}