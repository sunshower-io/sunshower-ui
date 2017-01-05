import {BlockElement} from "component/model/block";
export class BlockManager {

    private blockList: BlockElement[];
    private blocks: {[key: string]: BlockElement};

    constructor() {
        this.blocks = {};
        this.blockList = [];
        // for(let i = 0; i < 100; i++) {
        //     this.add(new BlockElement('block' + i, "just a block"));
        // }
    }

    add(block:BlockElement) : boolean {
        if(!this.blocks[block.id]) {
            this.blocks[block.id] = block;
            this.blockList.push(block);
            return true;
        }
        return false;
    }

    list() : BlockElement[] {
        return this.blockList;
    }
}