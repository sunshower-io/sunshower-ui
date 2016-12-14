/**
 * Created by dustinlish on 11/9/16.
 */




import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";

import * as PNotify from 'pnotify';
import 'pnotify.callbacks';

import {
    mxGraph,
    Layer,
    mxCell,
} from "mxgraph";

import {
    AbstractGraph,
    GraphProcessor
} from '../abstract-graph'



import {
    Builder, NavigationAware
} from '../builder';

import {Builder as GBuilder} from '../graph/builder'
import {Registry} from 'utils/registry';
import {AddInfrastructure as AddInfrastructureDialog} from "./components/add-infrastructure";

@inject(
    HttpClient,
    Builder,
    Registry
)
export class Applications extends AbstractGraph implements NavigationAware {

    private infrastructureDialog:AddInfrastructureDialog;
    constructor(private client: HttpClient,
                private parent: Builder,
                registry:Registry
    ) {
        super(registry);
    }


    attached(): void {
        super.attached();
        this.parent.set(this);
    }


    modifyGraph(event: Event) {
        let offset = $(this.graph.container).offset(),
            context = {
                offset: offset,
                graph: this.graph
            },
            processor = (<any>event).detail as GraphProcessor;
        processor.apply(context);
    }




    private computePosition(): JQueryCoordinates {
        if (this.rightVisible) {
            let right = $(this.rightSidebar).children(':first-child'),
                rightOffset = $(right).offset();
            return {
                top: rightOffset.top + 20,
                left: rightOffset.left - 320
            };
        } else {
            let offset = $(this.container).offset(),
                width = $(this.container).width();
            return {
                top: offset.top + 20,
                left: width - 320
            }
        }
    }


    addInfrastructure(e:Event) : void {
        this.infrastructureDialog.show();
    }

    handleCycle() {
        new PNotify({
            title: 'Error',
            text: 'Adding that edge would introduce an irreducible cycle',
            opacity: 0.90,
            type: 'error',
            addclass: 'graph-error',
            width: '300px',
            context: $(this.container),
            before_open: (f) => {
                let position = this.computePosition();
                f.get().css(position);
            }
        });
    }


    protected createBuilder(): GBuilder {
        return new GBuilder(this.container);
    }

}