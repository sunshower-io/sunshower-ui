var appRoot = 'src/';
var outputRoot = 'dist/';
var exporSrvtRoot = 'export/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  style: 'styles/**/*.css',
  output: outputRoot,
  exportSrv: exporSrvtRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/**/*.ts',
  e2eSpecsDist: 'test/e2e/dist/',
  pug: appRoot + '**/*.pug',
  less: [
      './assets/theme.config'
    // './assets/**/*.config',
    // './assets/**/*.less',
    // './src/**/*/*.less'
  ],
  inlineLess: [
      './src/**/*.less'
  ],
  dtsSrc: [
     './tsd/**/*.d.ts',
    './typings/**/*.d.ts',
    './custom_typings/**/*.d.ts'
  ]
};
