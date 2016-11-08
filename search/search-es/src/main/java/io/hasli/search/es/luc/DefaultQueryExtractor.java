package io.hasli.search.es.luc;

import io.hasli.search.api.QueryExtractor;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.Query;

/**
 * Created by haswell on 11/8/16.
 */
public class DefaultQueryExtractor implements QueryExtractor<Query, Object> {


    @Override
    public Query query(Object exemplar) {
        BooleanQuery.Builder builder = new BooleanQuery.Builder();
        builder.

    }
}
