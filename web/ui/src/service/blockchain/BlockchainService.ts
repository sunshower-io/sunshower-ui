import {Revision} from "../history/HistoryService";
import {Node} from "../nodes/NodeService";
import {_} from "lodash";

type BlockType = 
    "commit" | 
    "push" | 
    "transaction" | 
    "escalation" | 
    "alarm";

export class Block {
    revision:Revision;
    nodes:Array<Node>;

    constructor(public revision:Revision,
                public nodes:Array<Node>, 
                public type:BlockType = "commit") {
    }
}


export class BlockchainService {
    
    private blocks:Array<Block>;
    
   
    constructor () {
        this.blocks = [];
    }
    
    commit(block:Block) {
        this.blocks.push(block);
    }
    

    listAll():Array<Block> {
        return this.blocks;
    }
    
    listOn(nodeId:string) : Array<Block> {
        return _.filter(this.blocks, (block:Block) => {
            return _.any(block.nodes, (n:Node) => {
                return n.id === nodeId;
            });
        });
    }
    
    
    
    
    


}