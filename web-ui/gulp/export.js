// this file provides a list of unbundled files that
// need to be included when exporting the application
// for production.
module.exports = {
    'list': [
        'index.html',
        'config.js',
        'favicon.ico',
        'LICENSE',
        'assets/**/*',
        'mx/css/**/*',
        'mx/resources/**/*',
        'dist/css/*',
        'dist/fonts/**/*',
        "jspm_packages/npm/bluebird@3.4.1/js/browser/bluebird.min.js",
        "jspm_packages/npm/jquery@2.2.4/dist/jquery.js",
        'jspm_packages/system.js',
        'jspm_packages/system-polyfills.js',
        'jspm_packages/system-csp-production.js',
        'jspm_packages/github/sciactive/pnotify@3.0.0.js',
        'jspm_packages/github/jgraph/mxgraph-js@master.js',
        'jspm_packages/npm/materialize-css@0.98.1.js',
        'jspm_packages/npm/aurelia-animator-velocity@1.0.1',
        'jspm_packages/npm/lodash@4.17.4.js',
        'jspm_packages/npm/rxjs@5.0.3.js',
        'jspm_packages/npm/mdi@1.9.33',
        'jspm_packages/github/plotly/plotly.js@1.21.3.js',
        'jspm_packages/github/dmauro/Keypress@2.1.4.js',
        'jspm_packages/github/systemjs/plugin-css@0.1.33.js',
        'jspm_packages/github/systemjs/plugin-css@0.1.33/css.js',
        'jspm_packages/github/systemjs/plugin-json@0.1.33.js',
        'jspm_packages/github/systemjs/plugin-text@0.1.33.js',
        'jspm_packages/github/julianshapiro/velocity@1.4.1.js',
        'jspm_packages/github/jspm/**/*',
        'jspm_packages/npm/mdi@1.9.33/css/materialdesignicons.css',
        'jspm_packages/npm/buffer@3.6.0.js',
        'jspm_packages/npm/buffer@3.6.0/**/*',
        'jspm_packages/npm/showdown@1.6.4.js',
        'jspm_packages/github/canvg/canvg@master.js',
        'jspm_packages/github/joyent/node-docker-file-parser@master.js',
        'jspm_packages/npm/chart.js@2.5.0.js',
        'jspm_packages/npm/xterm@2.4.0.js',
        'jspm_packages/github/ajaxorg/ace-builds@1.2.6.js',
        'styles/styles.css'
    ],
    // this section lists any jspm packages that have
    // unbundled resources that need to be exported.
    // these files are in versioned folders and thus
    // must be 'normalized' by jspm to get the proper
    // path.
    'normalize': [
        ['keypress', ['/**/*']],
        ['plotly/plotly.js', ['/**/*']],
        ['velocity', ['/**/*']],
        ['mdi', ['/css/*.css', '/fonts/*.eot', '/fonts/*.svg', '/fonts/**']],
        ['plugin-css', ['/css.js']],
        [
            'materialize-css', [
                '/bin/materialize.js',
                '/bin/materialize.css'
        ]],
        [
            'ace', [
            '/*.js'
        ]],
        [
            'node-docker-file-parser', [
            '/*.js'
        ]],
        [
            'xterm', [
            '/**/*.js',
            '/**/*.css'
        ]],
        [
         'showdown', [
             '/dist/*.js'
        ]],
        [
            'rxjs', [
                '/**/*.js',
                '/*.js'
        ]],
        [
            'chart.js', [
                '/dist/Chart.min.js'
        ]],
        [
            'dockerfile-parser', [
            '/**/*.js'
        ]],
        [
            'lodash', [
                '/lodash.js'

        ]],
        [
            'canvg', [
                '/*',
                '/**',
                '/canvg@master.js'

        ]],
        [
            'pnotify', [
                '/dist/*'
        ]], [
            'mxgraph', [
                '/javascript/*/**',
                '/javascript/*'
            ]
        ], [
            // include font-awesome.css and its fonts files
            'font-awesome', [
            '/css/font-awesome.min.css',
            '/fonts/*'
        ]],
        [
            'bluebird', [
                '/js/browser/bluebird.min.js'
            ]
        ]
    ]
};
