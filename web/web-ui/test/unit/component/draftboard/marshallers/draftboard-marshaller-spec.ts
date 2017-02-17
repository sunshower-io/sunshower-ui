import {} from 'jasmine';
import any = jasmine.any;

import {Registry} from "common/lib/utils/registry";
import {Canvas} from 'common/lib/canvas/core/canvas';
import {initialize} from 'aurelia-pal-browser';

import {DraftboardMarshaller} from 'apps/workspaces/services/draftboard/marshallers/marshaller';

import {Container} from "aurelia-dependency-injection";
import {Draftboard} from "apps/workspaces/services/draftboard/draftboard";
import {ActionManager} from "common/lib/canvas/actions/action-service";
import {ParallelSchedule} from "common/lib/algorithms/graph/scheduling";
import {ApplicationDeployment} from "apps/workspaces/model/components/deployment";
import {InfrastructureNode} from "apps/workspaces/model/components/infrastructure-node";

describe('a draftboard marshaller', () => {

    let
        canvas                  : Canvas = null,
        container               : Container = null,
        draftboard              : Draftboard = null,
        containerElement        : HTMLElement = null,
        registry                : Registry = null,
        actionManager           : ActionManager = null,
        marshaller              : DraftboardMarshaller = null;

    initialize();


    beforeEach(() => {
        container = new Container();
        registry = container.get(Registry);
        actionManager = container.get(ActionManager);
        containerElement = document.createElement('div');
        canvas = new Canvas(containerElement, registry, actionManager);
        draftboard = new Draftboard(canvas);
        registry.draftboardManager.setFocusedDraftboard(draftboard);
        marshaller = new DraftboardMarshaller();
    });


    it('should serialize a single application and node correctly', () => {
        let application = new ApplicationDeployment(),
            host = new InfrastructureNode(),
            ps = new ParallelSchedule();
        host.addTo(canvas, null, true);

        host.addElement(application);
        draftboard.connect(application, host);
        let seqs = ps.run(draftboard);
        expect(seqs.length).toBe(2);
        expect(seqs[0].elements[0].id).toBe(host.id);
    });

    it('should compute the execution order of a node with multiple applications correctly', () => {
        let application = new ApplicationDeployment(),
            app2 = new ApplicationDeployment(),
            app3 = new ApplicationDeployment(),
            host = new InfrastructureNode(),
            ps = new ParallelSchedule();
        host.addTo(canvas, null, true);

        host.addElement(application);
        host.addElement(app2);
        host.addElement(app3);

        let seqs = ps.run(draftboard);
        expect(seqs.length).toBe(2);
        expect(seqs[0].elements[0].id).toBe(host.id);
        expect(seqs[1].elements.length).toBe(3);

    });

    it('should serialize a node with multiple applications correctly', () => {
        let application = new ApplicationDeployment(),
            app2 = new ApplicationDeployment(),
            app3 = new ApplicationDeployment(),
            host = new InfrastructureNode(),
            ps = new ParallelSchedule(),
            marshaller = new DraftboardMarshaller();
        host.addTo(canvas, null, true);

        host.addElement(application);
        host.addElement(app2);
        host.addElement(app3);

        // draftboard.connect(application, host);
        // draftboard.connect(app2, host);
        // draftboard.connect(app3, host);

        let dboard = marshaller.write(draftboard);
        console.log(JSON.stringify(dboard));
    });

});