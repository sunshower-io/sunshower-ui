package io.hasli.search.es;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import io.hasli.hal.api.instance.InstanceDescriptor;
import io.hasli.search.api.Document;
import io.hasli.search.api.Scanner;
import io.hasli.search.common.scanners.HasliFieldScanner;
import io.hasli.search.es.luc.DefaultQueryExtractor;
import io.hasli.search.es.luc.LuceneFieldMappings;
import io.hasli.search.service.IndexingService;
import io.hasli.search.service.SearchService;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.RAMDirectory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.inject.Inject;
import java.io.IOException;
import java.util.Set;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

/**
 * Created by haswell on 11/5/16.
 */
@ContextConfiguration(
        classes =
                HALProviderSearchServiceTest.class
)
@RunWith(SpringJUnit4ClassRunner.class)
public class HALProviderSearchServiceTest {


    @Bean
    public Analyzer analyzer() {
        return new StandardAnalyzer();
    }

    @Bean
    public Directory directory() {
        return new RAMDirectory();
    }


    @Bean
    public IndexWriterConfig indexWriter(
            Analyzer analyzer,
            Directory directory
    ) throws IOException {
        IndexWriterConfig configuration =
                new IndexWriterConfig(analyzer);
        return configuration;
    }


    @Bean
    public Scanner scanner() {
        return new HasliFieldScanner();
    }

    @Bean
    public IndexingService indexingService(
            Directory directory,
            Scanner scanner,
            IndexWriterConfig configuration
    ) {
        return new HALProviderIndexService(
            scanner,
            directory,
            configuration,
            new LuceneFieldMappings()
        );
    }

    @Bean
    public SearchService searchService(Directory directory) throws IOException {
        return new HALProviderSearchService(directory);
    }


    @Inject
    private SearchService searchService;

    @Inject
    private IndexingService indexingService;


    @Test
    @SuppressWarnings("unchecked")
    public void ensureListingAndIndexingAMIsWorks() {
        InstanceDescriptor descriptor =
                new InstanceDescriptor();

        descriptor.setName("test");

        indexingService.index(descriptor);

        Set<Document> documents = searchService.search(
                descriptor, new DefaultQueryExtractor());
        assertThat(documents.size(), is(1));
    }







    private AWSCredentials getCredentials() {
        return new BasicAWSCredentials(
                "AKIAIFJ27HM6XGUVTNWQ",
                "rgVTl5kP5+3U3IaDUtP1MDNvX9mdUG9dK6vgDD3Q"
        );

    }

}