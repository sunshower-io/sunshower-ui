package io.hasli.hfs.service;

import java.io.*;
import java.net.*;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public interface NamedStreamable {

    InputStream getInputStream() throws IOException;

    Optional<String> getName();

    boolean isDirectory();

    default boolean close() {
        return true;
    }

    default byte[] getContents() throws IOException {
        InputStream in = getInputStream();
        ByteArrayOutputStream bout = new ByteArrayOutputStream();
        byte[] tmp = new byte[4096];
        int r;
        while ((r = in.read(tmp)) >= 0)
            bout.write(tmp, 0, r);
        return bout.toByteArray();
    }


    class ZipWrapper implements NamedStreamable {
        private final String name;
        private final boolean close;
        private final ZipEntry entry;
        private final ZipInputStream inputStream;

        public ZipWrapper(
                final String name,
                final ZipInputStream inputStream,
                final ZipEntry entry,
                boolean close) {
            this.name = name;
            this.entry = entry;
            this.close = close;
            this.inputStream = inputStream;
        }

        public ZipWrapper(
                final String name,
                final ZipInputStream inputStream,
                final ZipEntry entry) {
            this(name, inputStream, entry, true);
        }

        public boolean close() {
            return close;
        }


        @Override
        public InputStream getInputStream() throws IOException {
            return new EntryInputStream(entry, inputStream);
        }

        @Override
        public Optional<String> getName() {
            return Optional.of(name);
        }
        @Override
        public boolean isDirectory() {
            return entry.isDirectory();
        }
    }


    class EntryInputStream extends InputStream {
        final ZipEntry entry;
        final ZipInputStream inputStream;

        public EntryInputStream(ZipEntry entry, ZipInputStream inputStream) {
            this.entry = entry;
            this.inputStream = inputStream;
        }

        @Override
        public int read() throws IOException {
            return inputStream.read();
        }


        public void close() throws IOException {
            this.inputStream.closeEntry();
        }
    }

    class StreamWrapper implements NamedStreamable {
        final boolean close;
        final InputStream inputStream;

        public StreamWrapper(InputStream inputStream) {
            this(inputStream, true);
        }
        public StreamWrapper(InputStream inputStream, boolean close) {
            this.close = close;
            this.inputStream = inputStream;
        }

        public boolean close() {
            return close;
        }


        @Override
        public InputStream getInputStream() throws IOException {
            return inputStream;
        }

        @Override
        public Optional<String> getName() {
            return Optional.empty();
        }

        @Override
        public boolean isDirectory() {
            return false;
        }
    }

    class FileWrapper implements NamedStreamable {
        private final File source;
        private final String pathPrefix;

        public FileWrapper(String pathPrefix, File source) {
            this.source = source;
            this.pathPrefix = pathPrefix;
        }

        public FileWrapper(File source) {
            this("", source);
        }

        public InputStream getInputStream() throws IOException {
            return new FileInputStream(source);
        }

        public boolean isDirectory() {
            return source.isDirectory();
        }

        public File getFile() {
            return source;
        }

        public Optional<String> getName() {
            try {
                return Optional.of(URLEncoder.encode(pathPrefix + source.getName(), "UTF-8"));
            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException(e);
            }
        }
    }




    class ByteArrayWrapper implements NamedStreamable {
        private final Optional<String> name;
        private final byte[] data;

        public ByteArrayWrapper(byte[] data) {
            this(Optional.empty(), data);
        }

        public ByteArrayWrapper(String name, byte[] data) {
            this(Optional.of(name), data);
        }

        public ByteArrayWrapper(Optional<String> name, byte[] data) {
            this.name = name;
            this.data = data;
        }

        public boolean isDirectory() {
            return false;
        }

        public InputStream getInputStream() throws IOException {
            return new ByteArrayInputStream(data);
        }

        public Optional<String> getName() {
            return name;
        }
    }
}