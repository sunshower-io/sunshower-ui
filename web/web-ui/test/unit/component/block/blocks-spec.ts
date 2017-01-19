import {} from 'jasmine';
import any = jasmine.any;
import 'aurelia-polyfills';
import {Container} from "aurelia-framework";
import {BlockManager} from 'component/blocks/block';
import {BlockType, BlockElement} from "component/model/block";


describe('a block manager', () => {

    let container:Container = null,
        blockManager: BlockManager = null;

    beforeEach(() => {
        container = new Container();
        blockManager = container.get(BlockManager);
    });

    it('should be injected correctly', () => {
        expect(blockManager).toBeTruthy();
    });

    it('should list element types correctly', () => {
        let fst = new BlockElement(),
            snd = new BlockElement();
        fst.type = BlockType.Custom;
        snd.type = BlockType.Official;
        blockManager.add(fst);
        blockManager.add(snd);
        expect(blockManager.listTypes().length).toBe(2);
    });

    it('should collect categories correctly', () => {

        let c1 = new BlockElement();
        c1.categories = ["Frap", "adap"];
        blockManager.add(c1);
        let categories = blockManager.getCategories();
        expect(categories.length).toBe(2);
    });

    it('should list element type names', () => {
        let fst = new BlockElement(),
            snd = new BlockElement();
        fst.type = BlockType.Custom;
        snd.type = BlockType.Official;
        blockManager.add(fst);
        blockManager.add(snd);
        expect(blockManager.listTypes()).toEqual([1, 0]);
    });

    it('should filter types', () => {
        let this_type = BlockType.Official;
        let boop = new BlockElement();
        boop.type = this_type;
        blockManager.add(boop);
        let blocks = blockManager.getElementsOfType(this_type);
        expect(blocks.indexOf(boop) > -1).toBe(true);
    });

    it('should filter categories', () => {
        let this_category = 'Sassy Boopings';
        let boop = new BlockElement();
        boop.categories = ['All', this_category];
        blockManager.add(boop);
        let blocks = blockManager.getElementsOfCategory(this_category);
        expect(blocks.indexOf(boop) > -1).toBe(true);
    });


});
