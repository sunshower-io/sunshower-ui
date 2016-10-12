var appRoot = 'src/';
var outputRoot = 'dist/';
var exporSrvtRoot = 'export/'

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  pug: appRoot + '**/*.pug',
  css: appRoot + '**/*.css',
  style: 'styles/**/*.css',
  output: outputRoot,
  exportSrv: exporSrvtRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/**/*.ts',
  e2eSpecsDist: 'test/e2e/dist/',
  scss: [
      './assets/styles/**/*.scss',
      './src/**/*/*.scss'
  ],
  dtsSrc: [
    './typings/**/*.d.ts',
    './custom_typings/**/*.d.ts',
    './jspm_packages/**/*.d.ts'
  ]
};
