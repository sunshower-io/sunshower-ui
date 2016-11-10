package io.hasli.search.es;

import io.hasli.search.api.Scanner;
import io.hasli.search.common.scanners.HasliFieldScanner;
import io.hasli.search.es.luc.LuceneFieldMappings;
import io.hasli.search.service.IndexingService;
import io.hasli.search.service.SearchService;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.RAMDirectory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

/**
 * Created by haswell on 11/10/16.
 */
@Configuration
public class SearchConfiguration {

    @Bean
    public Analyzer analyzer() {
        return new StandardAnalyzer();
    }

    @Bean
    public Directory directory() {
        return new RAMDirectory();
    }


    @Bean
    public Scanner scanner() {
        return new HasliFieldScanner();
    }

    @Bean
    public IndexingService indexingService(
            Directory directory,
            Scanner scanner,
            Analyzer analyzer
    ) {
        return new HALProviderIndexService(
                scanner,
                directory,
                analyzer,
                new LuceneFieldMappings()
        );
    }

    @Bean
    public SearchService searchService(Directory directory) throws IOException {
        return new HALProviderSearchService(directory);
    }


}
