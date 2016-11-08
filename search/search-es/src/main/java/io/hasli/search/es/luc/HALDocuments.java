package io.hasli.search.es.luc;

import io.hasli.search.api.Document;
import io.hasli.search.common.TextDocument;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;

import java.io.IOException;
import java.util.*;

/**
 * Created by haswell on 11/8/16.
 */
public class HALDocuments implements Set<Document> {

    private final Set<Document> delegate;
    public HALDocuments(final IndexSearcher searcher, TopDocs docs) throws IOException {
        this.delegate = new LinkedHashSet<>(docs.totalHits);

        for(int i = 0; i < docs.scoreDocs.length; i++) {
            org.apache.lucene.document.Document doc =
                    searcher.doc(docs.scoreDocs[i].doc);
            final Document document = new TextDocument(
                    UUID.fromString(doc.get("DistributableEntity#id")));
            this.delegate.add(document);
        }
    }


    @Override
    public int size() {
        return delegate.size();
    }

    @Override
    public boolean isEmpty() {
        return size() > 0;
    }

    @Override
    public boolean contains(Object o) {
        return delegate.contains(o);
    }

    @Override
    public Iterator<Document> iterator() {
        return delegate.iterator();
    }

    @Override
    public Object[] toArray() {
        return delegate.toArray();
    }

    @Override
    public <T> T[] toArray(T[] a) {
        return delegate.toArray(a);
    }

    @Override
    public boolean add(Document document) {
        return delegate.add(document);
    }

    @Override
    public boolean remove(Object o) {
        return delegate.remove(o);
    }

    @Override
    public boolean containsAll(Collection<?> c) {
        return delegate.containsAll(c);
    }

    @Override
    public boolean addAll(Collection<? extends Document> c) {
        return delegate.addAll(c);
    }

    @Override
    public boolean retainAll(Collection<?> c) {
        return delegate.retainAll(c);
    }

    @Override
    public boolean removeAll(Collection<?> c) {
        return delegate.removeAll(c);
    }

    @Override
    public void clear() {
        delegate.clear();
    }

}
