import * as _ from 'lodash';
import {Router} from 'aurelia-router';
import {inject, TaskQueue} from 'aurelia-framework';
import {BlockManager} from 'component/blocks/block';
import {BlockElement, BlockType} from 'component/model/block';

@inject(Router, TaskQueue, BlockManager)
export class Blocks {

    private list:HTMLElement;
    private blocks:BlockElement[];
    private previousSelectedType: JQuery;
    private previousSelectedCategory: JQuery;

    constructor(
        private router      : Router,
        private taskQueue   : TaskQueue,
        private blockManager: BlockManager
    ) {

    }


    openBlock(id:string) : void {
        this.router.navigate('block/' + id);
    }

    attached() : void {
        this.blocks = this.blockManager.list();
        this.taskQueue.queueMicroTask(() => {
            this.resize();
        });
        //TODO set previousSelectedType
        this.previousSelectedCategory = $(".category-menu .name:contains('All')").parent('.item');
        this.previousSelectedCategory.addClass('active');
    }

    resize() : void {
        let height = window.innerHeight - $(this.list).offset().top - 32;
        $(this.list).height(height);
    }

    nameOf(blockType:BlockType) : string {
        return BlockType[blockType];
    }

    private filterTypes(t: BlockType, event: Event) {
        if (this.previousSelectedType) {
            $(this.previousSelectedType).removeClass('active');
        }
        let clicked_element = $(event.target);
        let element = clicked_element.hasClass('item') ? clicked_element : clicked_element.parent('.item');
        element.addClass('active');
        this.previousSelectedType = element;
        this.blocks = this.blockManager.getElementsOfType(t);
        //TODO take into account active category
    }

    private filterCategories(c: string, event: Event) {
        if (this.previousSelectedCategory) {
            $(this.previousSelectedCategory).removeClass('active');
        }
        let clicked_element = $(event.target);
        let element = clicked_element.hasClass('item') ? clicked_element : clicked_element.parent('.item');
        element.addClass('active');
        this.previousSelectedCategory = element;
        this.blocks = this.blockManager.getElementsOfCategory(c);
        //TODO take into account active type
    }

}