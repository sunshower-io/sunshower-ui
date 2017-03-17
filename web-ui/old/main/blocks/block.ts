import {inject} from 'aurelia-framework';
import {BlockManager} from 'component/blocks/block';
import {BlockElement} from 'component/model/block';
import {
    Router,
    RouterConfiguration
} from 'aurelia-router';

@inject(BlockManager)
export class Block {
    router: Router;
    block: BlockElement;

    constructor(private blockManager: BlockManager) {

    }


    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Workspace';
        config.map([
            {
                route: ['', 'summary'],
                name: 'summary',
                moduleId: 'main/blocks/summary',
                title: 'Summary',
                nav: true
            },
            {
                route: 'dependencies',
                name: 'Dependencies',
                moduleId: 'main/blocks/dependencies',
                title: 'Dependencies',
                nav: true
            },
            {
                route: 'history',
                name: 'Version',
                moduleId: 'main/blocks/history',
                title: 'History',
                nav: true
            }]);
        this.router = router;
    }


    activate(params: any) {
        this.block = this.blockManager.get(params.id);
    }
}