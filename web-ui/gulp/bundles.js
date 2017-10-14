module.exports = {
    "bundles": {
        "dist/app-build": {
            "includes": [
                "[**/*.js]",
                "**/*.html!text",
                "**/*.css!text"
            ],
            "options": {
                "inject": true,
                "minify": true,
                "depCache": true,
                "rev": false
            }
        },
        "dist/aurelia": {
            "includes": [
                "aurelia-framework",
                "aurelia-bootstrapper",
                "aurelia-fetch-client",
                "aurelia-dialog",
                "aurelia-pal-browser",
                "aurelia-router",
                "aurelia-animator-velocity",
                "aurelia-animator-css",
                "aurelia-templating-binding",
                "aurelia-polyfills",
                "aurelia-templating-resources",
                "aurelia-event-aggregator",
                "aurelia-templating-router",
                "aurelia-loader-default",
                "aurelia-history-browser",
                "aurelia-http-client",
                "aurelia-logging-console",
                "aurelia-validation",
                "fetch",
                "jquery"
            ],
            "options": {
                "inject": true,
                "minify": true,
                "depCache": false,
                "rev": false
            }
        }
    }
};
