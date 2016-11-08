package io.hasli.search.common.scanners;

import io.hasli.search.api.Document;
import io.hasli.search.api.Field;
import io.hasli.search.api.Index;
import io.hasli.search.api.Scanner;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

/**
 * Created by haswell on 11/8/16.
 */
public class HasliFieldScannerTest {




    static class Doc1 {
        @Index
        private String firstName;
    }


    private Scanner scanner;
    @Before
    public void setUp() {
        scanner = new HasliFieldScanner();
    }

    @Test
    public void ensureScanningDocumentWithPrivateIndexedFieldProducesExpectedField() {
        final Doc1 doc1 = new Doc1();
        doc1.firstName = "Josiah";
        Document scan = scanner.scan(Doc1.class, doc1);
        assertThat(scan.getFields().size(), is(1));
        Field next = scan.getFields().iterator().next();
        assertEquals(next.getType(), String.class);

    }

    @Test
    public void ensureScanningDocumentWithPrivateIndexedFieldProducesExpectedDocument() {
        final Doc1 doc1 = new Doc1();
        doc1.firstName = "Josiah";
        Document scan = scanner.scan(Doc1.class, doc1);
        assertThat(scan.getFields().size(), is(1));
        Field next = scan.getFields().iterator().next();
        assertThat("Josiah", is(next.getValue()));
    }

}