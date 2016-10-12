

import {Container} from "aurelia-framework";
import {ConfigurationService, RevisableDocument} from "../../../../src/service/nodes/ConfigurationService";
import {HistoryService} from "../../../../src/service/history/HistoryService";
describe('the configuration service', () => {

    var historyService:HistoryService;
    var configurationService:ConfigurationService;

    beforeEach(() => {
        let container = new Container().makeGlobal();
        container.autoRegister(HistoryService);
        container.autoRegister(ConfigurationService);
        historyService = container.get(HistoryService);
        configurationService = container.get(ConfigurationService);
    });


    it('must be injected', () => {
        expect(configurationService).not.toBeNull();
    });

    it('history service must be the same as the configuration service\'s instance', () => {
        expect(configurationService.historyService).toBe(historyService);
    });
    
    it('must have its dependencies', () => {
        expect(configurationService.historyService).not.toBeUndefined();
        expect(configurationService.historyService).not.toBeNull();
    });
    
    it('when saving a document, the document must appear in its unsaved documents list but not be committed', () => {
        let doc = new RevisableDocument('1', `document1`, "hi");
        configurationService.save(doc)
        expect(configurationService.getUncommittedDocuments().length).toBe(1);
    });
    
    it('when saving a document, the document must appear correctly in its unsaved documents list', () => {
        let doc = new RevisableDocument('1', `document1`, "hi");
        configurationService.save(doc)
        let uncommitted = configurationService.getUncommittedDocuments()[0];
        expect(uncommitted.data).toBe('hi');
        expect(uncommitted.id).toBe('1');
        expect(uncommitted.name).toBe('document1');
    });
    
    
    it('must register the revision with historyService when commit() is called and clear the configurationService', () => {
        let doc = new RevisableDocument('1', `document1`, "hi");
        configurationService.save(doc)
        configurationService.commit("This is the shiznit");
        expect(configurationService.getUncommittedDocuments()).toEqual([]);
        expect(historyService.getRevisions().length).toBe(1);

        let revisions = historyService.getRevisions(),
            revision = revisions[0],
            revisedDocument = revision.getRevisedObjects()[0];
        expect(revision.getRevisedObjects().length).toBe(1);
        let doc : RevisableDocument  = <RevisableDocument>revisedDocument;
        expect(doc.id).toBe('1');
        expect(doc.name).toBe('document1');
        expect(doc.data).toBe("hi");
    });


    
});

