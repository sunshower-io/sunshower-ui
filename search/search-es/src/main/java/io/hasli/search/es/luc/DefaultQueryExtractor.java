package io.hasli.search.es.luc;

import io.hasli.hal.api.instance.InstanceDescriptor;
import io.hasli.search.api.QueryExtractor;
import org.apache.lucene.index.Term;
import org.apache.lucene.search.BooleanClause;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.TermQuery;

/**
 * Created by haswell on 11/8/16.
 */
public class DefaultQueryExtractor implements QueryExtractor<Query, InstanceDescriptor> {


    @Override
    public Query query(InstanceDescriptor exemplar) {
        BooleanQuery.Builder builder = new BooleanQuery.Builder();
        builder.add(new TermQuery(
                new Term("name", exemplar.getName())),
                BooleanClause.Occur.SHOULD);
        return builder.build();
    }
}
