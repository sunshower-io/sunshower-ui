package io.hasli.search.es.luc;

import io.hasli.search.api.Document;
import org.apache.lucene.search.TopDocs;

import java.util.Collection;
import java.util.Iterator;
import java.util.Set;

/**
 * Created by haswell on 11/8/16.
 */
public class HALDocuments implements Set<Document> {

    final TopDocs docs;
    public HALDocuments(TopDocs docs) {
        this.docs = docs;
    }


    @Override
    public int size() {
        return docs.totalHits;
    }

    @Override
    public boolean isEmpty() {
        return size() > 0;
    }

    @Override
    public boolean contains(Object o) {
        return false;
    }

    @Override
    public Iterator<Document> iterator() {
        return null;
    }

    @Override
    public Object[] toArray() {
        return new Object[0];
    }

    @Override
    public <T> T[] toArray(T[] a) {
        return null;
    }

    @Override
    public boolean add(Document document) {
        return false;
    }

    @Override
    public boolean remove(Object o) {
        return false;
    }

    @Override
    public boolean containsAll(Collection<?> c) {
        return false;
    }

    @Override
    public boolean addAll(Collection<? extends Document> c) {
        return false;
    }

    @Override
    public boolean retainAll(Collection<?> c) {
        return false;
    }

    @Override
    public boolean removeAll(Collection<?> c) {
        return false;
    }

    @Override
    public void clear() {

    }
}
