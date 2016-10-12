import {bindable} from "aurelia-framework";
import {BlockchainService, Block} from "../../service/blockchain/BlockchainService";
import {autoinject} from "aurelia-dependency-injection";
import {Revision} from "../../service/history/HistoryService";
import {Hash} from "../../utils/Hash";

@autoinject()
export class BlockChain {
    
    @bindable id:string;
    
    @bindable 
    blockchainListVisible:boolean = true;
    
    @bindable 
    blockchainHistoryVisible:boolean = false;
    
    
    
    @bindable blocks:Array<Block>;
    
    constructor(private blockchainService:BlockchainService) {
        // for(var i = 0; i < 100; ++i) {
        //     let id = Hash.createId(),
        //         message = "Committed block" + id,
        //         revision = new Revision(id, message, true, []),
        //         block = new Block(revision, []);
        //     blockchainService.commit(block);
        // }
        //
        this.blocks = blockchainService.listAll();
        
    }
    
    showTimeline() {
        this.blockchainListVisible= false;
        this.blockchainHistoryVisible = true;
    }
    
    showList() {
        this.blockchainListVisible= true;
        this.blockchainHistoryVisible = false;
    }
    
    
    
    activate(params) {
        this.id = params.id;
    }
    
    
    
}