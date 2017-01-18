import {BlockType, BlockElement} from "component/model/block";
export class BlockManager {

    private blockList: BlockElement[];
    private blocks: {[key: string]: BlockElement};

    constructor() {
        this.blocks = {};
        this.blockList = [];
        for(let i = 0; i < 100; i++) {
            let block = new BlockElement();
            let num = Math.random();
            if(num > 0.9) {
                block.type = BlockType.Official;
            } else {
                block.type = BlockType.Custom;
            }
            block.name = "Block" + i;

            this.add(block);
        }
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