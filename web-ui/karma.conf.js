module.exports = function (config) {
    config.set({
        basePath: './',
        frameworks: ['systemjs', 'jasmine', 'karma-typescript'],
        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },
        systemjs: {
            configFile: 'config.js',
            config: {
                defaultJSExtensions:true,
                map: {
                    "*": "src/*",
                },
                paths: {
                    'src/*': 'src/*',
                    "test/*": "test/*",
                    "typescript": "node_modules/typescript/lib/typescript.js",
                    "systemjs": "node_modules/systemjs/dist/system.js",
                    'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
                    'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js'
                },
                packages: {
                    'test/unit': {
                        defaultExtension: 'ts'
                    },
                    'src': {
                        defaultExtension: 'ts'
                    }
                },
                transpiler: 'typescript',
                typescriptOptions: {
                    "module": "amd",
                    "emitDecoratorMetadata": true,
                    "experimentalDecorators": true
                }
            },
            serveFiles: [
                'dist/**/*.js',
                'src/**/*.ts',
                'jspm_packages/**/*.js'
            ]
        },
        files: [
            'test/unit/setup.ts',
            'test/unit/**/*.ts'
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        // browsers: ['Chrome'],

        browsers: ['Chrome'],
        customLaunchers: {
            ChromeSmall: {
                base: 'Chrome',
                flags: [
                    '--no-sandbox',
                    // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
                    '--headless',
                    '--disable-gpu',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    ' --remote-debugging-port=9222',
                ]

            }
        },

        singleRun: false
    });
};
