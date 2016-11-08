package io.hasli.search.es.luc;

import io.hasli.hal.api.compute.ComputeProfile;
import io.hasli.hal.api.instance.InstanceDescriptor;
import io.hasli.hal.api.memory.MemoryProfile;
import io.hasli.search.api.QueryExtractor;
import org.apache.lucene.document.IntPoint;
import org.apache.lucene.document.LongPoint;
import org.apache.lucene.index.Term;
import org.apache.lucene.search.*;

/**
 * Created by haswell on 11/8/16.
 */
public class DefaultQueryExtractor implements QueryExtractor<Query, InstanceDescriptor> {


    @Override
    public Query query(InstanceDescriptor exemplar) {
        BooleanQuery.Builder builder = new BooleanQuery.Builder();
//        builder.add(new TermQuery(
//                new Term("InstanceDescriptor#name", exemplar.getName())),
//                BooleanClause.Occur.SHOULD);

        register(exemplar.getComputeProfile(), builder);
        register(exemplar.getMemoryProfile(), builder);
        return builder.build();
    }

    private void register(MemoryProfile memoryProfile, BooleanQuery.Builder builder) {
        Query query = LongPoint.newRangeQuery(
                "MemoryProfile#bytes",
                memoryProfile.getBytes(), 1000);
        builder.add(query, BooleanClause.Occur.SHOULD);
    }

    private void register(ComputeProfile computeProfile, BooleanQuery.Builder builder) {
        Query query = IntPoint.newRangeQuery(
                "ComputeProfile#cores",
                computeProfile.getCores(), 1);
        builder.add(query, BooleanClause.Occur.SHOULD);
    }
}
