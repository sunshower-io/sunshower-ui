System.config({
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "*": "dist/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  meta: {
    "bootstrap": {
      "deps": [
        "jquery"
      ]
    },
    "mxgraph/javascript/mxClient": {
      "format": "global"
    },
    "pnotify": {
      "deps": [
        "jquery"
      ]
    }
  },
  map: {
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.1",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.1",
    "aurelia-framework": "npm:aurelia-framework@1.0.6",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
    "aurelia-pal": "npm:aurelia-pal@1.0.0",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.1.1",
    "aurelia-router": "npm:aurelia-router@1.0.6",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.1.1",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0",
    "bluebird": "npm:bluebird@3.4.1",
    "bootstrap": "github:twbs/bootstrap@3.3.7",
    "css": "github:systemjs/plugin-css@0.1.31",
    "cytoscape": "npm:cytoscape@2.7.11",
    "cytoscape-edgehandles": "npm:cytoscape-edgehandles@2.6.3",
    "cytoscape-grid-guide": "npm:cytoscape-grid-guide@1.0.3",
    "cytoscape-node-resize": "npm:cytoscape-node-resize@1.0.10",
    "cytoscape-node-resize:n": "npm:cytoscape-node-resize@1.0.10",
    "dropzone": "github:enyo/dropzone@4.3.0",
    "edge-editiation": "github:frankiex/cytoscape.js-edge-editation@master",
    "element-queries": "github:marcj/css-element-queries@0.3.2",
    "enyo/dropzone": "github:enyo/dropzone@4.3.0",
    "fetch": "github:github/fetch@1.0.0",
    "font-awesome": "npm:font-awesome@4.6.3",
    "jquery": "npm:jquery@2.2.4",
    "mxgraph": "github:jgraph/mxgraph-js@master",
    "ocanvas": "npm:ocanvas@2.8.6",
    "plugin-text": "npm:systemjs-plugin-text@0.0.9",
    "pnotify": "github:sciactive/pnotify@3.0.0",
    "pnotify.callbacks": "github:sciactive/pnotify@3.0.0/dist/pnotify.callbacks",
    "semantic-ui": "github:Semantic-Org/Semantic-UI@2.2.4",
    "text": "github:systemjs/plugin-text@0.0.9",
    "github:Semantic-Org/Semantic-UI@2.2.4": {
      "css": "github:systemjs/plugin-css@0.1.31",
      "jquery": "npm:jquery@2.2.4"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.9"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:twbs/bootstrap@3.3.7": {
      "jquery": "npm:jquery@2.2.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.1"
    },
    "npm:aurelia-binding@1.0.9": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0"
    },
    "npm:aurelia-bootstrapper@1.0.0": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0",
      "aurelia-framework": "npm:aurelia-framework@1.0.6",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.0.6",
      "aurelia-templating": "npm:aurelia-templating@1.1.1",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.1.1",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0"
    },
    "npm:aurelia-dependency-injection@1.1.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-event-aggregator@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0"
    },
    "npm:aurelia-framework@1.0.6": {
      "aurelia-binding": "npm:aurelia-binding@1.0.9",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.1.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.1"
    },
    "npm:aurelia-history-browser@1.0.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-loader-default@1.0.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-loader@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-logging-console@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0"
    },
    "npm:aurelia-metadata@1.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-pal-browser@1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-polyfills@1.1.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-route-recognizer@1.1.0": {
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-router@1.0.6": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.1.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.1.0"
    },
    "npm:aurelia-task-queue@1.1.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-templating-binding@1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.9",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.1"
    },
    "npm:aurelia-templating-resources@1.1.1": {
      "aurelia-binding": "npm:aurelia-binding@1.0.9",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.1.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.1"
    },
    "npm:aurelia-templating-router@1.0.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.1.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.0.6",
      "aurelia-templating": "npm:aurelia-templating@1.1.1"
    },
    "npm:aurelia-templating@1.1.1": {
      "aurelia-binding": "npm:aurelia-binding@1.0.9",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.1.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0"
    },
    "npm:bluebird@3.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.8",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:cytoscape-edgehandles@2.6.3": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "cytoscape": "npm:cytoscape@2.7.11",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:cytoscape-grid-guide@1.0.3": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:cytoscape-node-resize@1.0.10": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:cytoscape@2.7.11": {
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:font-awesome@4.6.3": {
      "css": "github:systemjs/plugin-css@0.1.31"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:ocanvas@2.8.6": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.9": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  },
  bundles: {
    "aurelia.js": [
      "github:Semantic-Org/Semantic-UI@2.2.4.js",
      "github:Semantic-Org/Semantic-UI@2.2.4/semantic.js",
      "github:github/fetch@1.0.0.js",
      "github:github/fetch@1.0.0/fetch.js",
      "npm:aurelia-animator-css@1.0.1.js",
      "npm:aurelia-animator-css@1.0.1/aurelia-animator-css.js",
      "npm:aurelia-binding@1.0.9.js",
      "npm:aurelia-binding@1.0.9/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.0.js",
      "npm:aurelia-bootstrapper@1.0.0/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.1.0.js",
      "npm:aurelia-dependency-injection@1.1.0/aurelia-dependency-injection.js",
      "npm:aurelia-event-aggregator@1.0.0.js",
      "npm:aurelia-event-aggregator@1.0.0/aurelia-event-aggregator.js",
      "npm:aurelia-fetch-client@1.0.1.js",
      "npm:aurelia-fetch-client@1.0.1/aurelia-fetch-client.js",
      "npm:aurelia-framework@1.0.6.js",
      "npm:aurelia-framework@1.0.6/aurelia-framework.js",
      "npm:aurelia-history-browser@1.0.0.js",
      "npm:aurelia-history-browser@1.0.0/aurelia-history-browser.js",
      "npm:aurelia-history@1.0.0.js",
      "npm:aurelia-history@1.0.0/aurelia-history.js",
      "npm:aurelia-loader-default@1.0.0.js",
      "npm:aurelia-loader-default@1.0.0/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0.js",
      "npm:aurelia-loader@1.0.0/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0.js",
      "npm:aurelia-logging-console@1.0.0/aurelia-logging-console.js",
      "npm:aurelia-logging@1.0.0.js",
      "npm:aurelia-logging@1.0.0/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.1.js",
      "npm:aurelia-metadata@1.0.1/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.0.0.js",
      "npm:aurelia-pal-browser@1.0.0/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.0.0.js",
      "npm:aurelia-pal@1.0.0/aurelia-pal.js",
      "npm:aurelia-path@1.1.1.js",
      "npm:aurelia-path@1.1.1/aurelia-path.js",
      "npm:aurelia-polyfills@1.1.1.js",
      "npm:aurelia-polyfills@1.1.1/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.1.0.js",
      "npm:aurelia-route-recognizer@1.1.0/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.0.6.js",
      "npm:aurelia-router@1.0.6/aurelia-router.js",
      "npm:aurelia-task-queue@1.1.0.js",
      "npm:aurelia-task-queue@1.1.0/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.0.0.js",
      "npm:aurelia-templating-binding@1.0.0/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.1.1.js",
      "npm:aurelia-templating-resources@1.1.1/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.1.1/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.1.1/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/attr-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/aurelia-hide-style.js",
      "npm:aurelia-templating-resources@1.1.1/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.1.1/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.1.1/binding-signaler.js",
      "npm:aurelia-templating-resources@1.1.1/compose.js",
      "npm:aurelia-templating-resources@1.1.1/css-resource.js",
      "npm:aurelia-templating-resources@1.1.1/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/dynamic-element.js",
      "npm:aurelia-templating-resources@1.1.1/focus.js",
      "npm:aurelia-templating-resources@1.1.1/hide.js",
      "npm:aurelia-templating-resources@1.1.1/html-resource-plugin.js",
      "npm:aurelia-templating-resources@1.1.1/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.1.1/if.js",
      "npm:aurelia-templating-resources@1.1.1/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.1.1/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.1.1/repeat.js",
      "npm:aurelia-templating-resources@1.1.1/replaceable.js",
      "npm:aurelia-templating-resources@1.1.1/sanitize-html.js",
      "npm:aurelia-templating-resources@1.1.1/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/show.js",
      "npm:aurelia-templating-resources@1.1.1/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/with.js",
      "npm:aurelia-templating-router@1.0.0.js",
      "npm:aurelia-templating-router@1.0.0/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.0.0/route-href.js",
      "npm:aurelia-templating-router@1.0.0/route-loader.js",
      "npm:aurelia-templating-router@1.0.0/router-view.js",
      "npm:aurelia-templating@1.1.1.js",
      "npm:aurelia-templating@1.1.1/aurelia-templating.js",
      "npm:jquery@2.2.4.js",
      "npm:jquery@2.2.4/dist/jquery.js"
    ],
    "app-build.js": [
      "algorithms/graph/graph.js",
      "algorithms/graph/tarjans.js",
      "app.html!github:systemjs/plugin-text@0.0.9.js",
      "app.js",
      "auth/auth-nav.html!github:systemjs/plugin-text@0.0.9.js",
      "auth/auth.html!github:systemjs/plugin-text@0.0.9.js",
      "auth/auth.js",
      "auth/login/login.html!github:systemjs/plugin-text@0.0.9.js",
      "auth/login/login.js",
      "auth/signup/signup.html!github:systemjs/plugin-text@0.0.9.js",
      "auth/signup/signup.js",
      "common/elements/nav-bar.html!github:systemjs/plugin-text@0.0.9.js",
      "common/elements/page-header.html!github:systemjs/plugin-text@0.0.9.js",
      "common/elements/profile-dropdown.html!github:systemjs/plugin-text@0.0.9.js",
      "common/elements/profile-dropdown.js",
      "common/sidenav/sidenav.html!github:systemjs/plugin-text@0.0.9.js",
      "common/sidenav/sidenav.js",
      "core/exceptions/type-errors.js",
      "core/trait.js",
      "form/deploy/deploy-wizard.html!github:systemjs/plugin-text@0.0.9.js",
      "form/deploy/deploy-wizard.js",
      "form/form.html!github:systemjs/plugin-text@0.0.9.js",
      "form/form.js",
      "initialize/initialize.html!github:systemjs/plugin-text@0.0.9.js",
      "initialize/initialize.js",
      "main.js",
      "main/applications/applications-side-menu.html!github:systemjs/plugin-text@0.0.9.js",
      "main/applications/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "main/applications/applications.js",
      "main/applications/apps/my-apps.html!github:systemjs/plugin-text@0.0.9.js",
      "main/applications/apps/my-apps.js",
      "main/applications/deploy/deploy-form.html!github:systemjs/plugin-text@0.0.9.js",
      "main/applications/deploy/deploy-form.js",
      "main/applications/deploy/deploy.html!github:systemjs/plugin-text@0.0.9.js",
      "main/applications/deploy/deploy.js",
      "main/applications/explore/explore.html!github:systemjs/plugin-text@0.0.9.js",
      "main/applications/explore/explore.js",
      "main/applications/instances/instances.html!github:systemjs/plugin-text@0.0.9.js",
      "main/applications/instances/instances.js",
      "main/applications/library/library.html!github:systemjs/plugin-text@0.0.9.js",
      "main/applications/library/library.js",
      "main/applications/templates/templates.html!github:systemjs/plugin-text@0.0.9.js",
      "main/applications/templates/templates.js",
      "main/home/home.html!github:systemjs/plugin-text@0.0.9.js",
      "main/home/home.js",
      "main/infrastructure/credentials/credentials.html!github:systemjs/plugin-text@0.0.9.js",
      "main/infrastructure/credentials/credentials.js",
      "main/infrastructure/infrastructure.html!github:systemjs/plugin-text@0.0.9.js",
      "main/infrastructure/infrastructure.js",
      "main/infrastructure/projects/projects.html!github:systemjs/plugin-text@0.0.9.js",
      "main/infrastructure/projects/projects.js",
      "main/main.html!github:systemjs/plugin-text@0.0.9.js",
      "main/main.js",
      "main/manage/applications/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "main/manage/applications/applications.js",
      "main/manage/deploy/deploy.html!github:systemjs/plugin-text@0.0.9.js",
      "main/manage/deploy/deploy.js",
      "main/manage/keyrings/keyrings.html!github:systemjs/plugin-text@0.0.9.js",
      "main/manage/keyrings/keyrings.js",
      "main/manage/manage.html!github:systemjs/plugin-text@0.0.9.js",
      "main/manage/manage.js",
      "main/manage/networks/networks.html!github:systemjs/plugin-text@0.0.9.js",
      "main/manage/networks/networks.js",
      "main/manage/node_configurations/node_configurations.html!github:systemjs/plugin-text@0.0.9.js",
      "main/manage/node_configurations/node_configurations.js",
      "main/manage/nodeconfigs/nodeconfigs.html!github:systemjs/plugin-text@0.0.9.js",
      "main/manage/nodeconfigs/nodeconfigs.js",
      "main/nav-bar.html!github:systemjs/plugin-text@0.0.9.js",
      "main/reports/reports.html!github:systemjs/plugin-text@0.0.9.js",
      "main/reports/reports.js",
      "main/settings/admin/admin.html!github:systemjs/plugin-text@0.0.9.js",
      "main/settings/admin/admin.js",
      "main/settings/hfs/hfs.html!github:systemjs/plugin-text@0.0.9.js",
      "main/settings/hfs/hfs.js",
      "main/settings/profile/profile.html!github:systemjs/plugin-text@0.0.9.js",
      "main/settings/profile/profile.js",
      "main/settings/settings.html!github:systemjs/plugin-text@0.0.9.js",
      "main/settings/settings.js",
      "main/storage/storage.html!github:systemjs/plugin-text@0.0.9.js",
      "main/storage/storage.js",
      "main/workspace/activity/activity.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/activity/activity.js",
      "main/workspace/applications/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/applications/applications.js",
      "main/workspace/builder/abstract-graph.js",
      "main/workspace/builder/applications/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/builder/applications/applications.js",
      "main/workspace/builder/applications/sidebars/controls.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/builder/applications/sidebars/group-menu/overlay.js",
      "main/workspace/builder/applications/sidebars/left-sidebar/left-sidebar.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/builder/applications/sidebars/left-sidebar/left-sidebar.js",
      "main/workspace/builder/applications/sidebars/right-sidebar/bottom/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/builder/applications/sidebars/right-sidebar/bottom/applications.js",
      "main/workspace/builder/applications/sidebars/right-sidebar/right-sidebar.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/builder/applications/sidebars/right-sidebar/right-sidebar.js",
      "main/workspace/builder/applications/sidebars/right-sidebar/top/palette.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/builder/applications/sidebars/right-sidebar/top/palette.js",
      "main/workspace/builder/applications/sidebars/right-sidebar/top/properties.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/builder/applications/sidebars/right-sidebar/top/properties.js",
      "main/workspace/builder/builder.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/builder/builder.js",
      "main/workspace/builder/cells/application.js",
      "main/workspace/builder/cells/cloud.js",
      "main/workspace/builder/cells/configuration.js",
      "main/workspace/builder/cells/deployment.js",
      "main/workspace/builder/cells/infrastructure.js",
      "main/workspace/builder/graph/builder.js",
      "main/workspace/builder/graph/connection-handler.js",
      "main/workspace/builder/graph/vertex.js",
      "main/workspace/builder/grid.js",
      "main/workspace/builder/infrastructure/infrastructure.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/builder/infrastructure/infrastructure.js",
      "main/workspace/builder/infrastructure/sidemenus/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/builder/infrastructure/sidemenus/applications.js",
      "main/workspace/builder/infrastructure/sidemenus/controls.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/builder/infrastructure/sidemenus/group-menu/overlay.js",
      "main/workspace/builder/infrastructure/sidemenus/left-menu.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/builder/infrastructure/sidemenus/left-menu.js",
      "main/workspace/builder/infrastructure/sidemenus/right-menu.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/builder/infrastructure/sidemenus/right-menu.js",
      "main/workspace/builder/listeners/hover-listener.js",
      "main/workspace/builder/menu/task-cell.js",
      "main/workspace/dashboard/dashboard.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/dashboard/dashboard.js",
      "main/workspace/infrastructure/clouds/clouds.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/infrastructure/clouds/clouds.js",
      "main/workspace/infrastructure/hosts/hosts.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/infrastructure/hosts/hosts.js",
      "main/workspace/infrastructure/infrastructure.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/infrastructure/infrastructure.js",
      "main/workspace/infrastructure/main/main.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/infrastructure/main/main.js",
      "main/workspace/infrastructure/storage/storage.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/infrastructure/storage/storage.js",
      "main/workspace/instances/instances.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/instances/instances.js",
      "main/workspace/logs/logs.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/logs/logs.js",
      "main/workspace/manage/manage.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/manage/manage.js",
      "main/workspace/reports/reports.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/reports/reports.js",
      "main/workspace/wizards/workspace-wizard.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/wizards/workspace-wizard.js",
      "main/workspace/workspace-router.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/workspace-router.js",
      "main/workspace/workspaces.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/workspaces.js",
      "model/core/application.js",
      "model/core/secret/credentials.js",
      "model/core/security/context.js",
      "model/core/security/index.js",
      "model/core/security/token.js",
      "model/core/security/user.js",
      "model/hal/api.js",
      "model/hal/image.js",
      "profile/profile.html!github:systemjs/plugin-text@0.0.9.js",
      "profile/profile.js",
      "settings/settings.html!github:systemjs/plugin-text@0.0.9.js",
      "settings/settings.js",
      "storage/local/local-storage.js",
      "task/infrastructure.js",
      "task/tasks.js",
      "utils/events.js",
      "utils/objects.js",
      "utils/observer.js",
      "utils/registry.js",
      "utils/uuid.js"
    ]
  },
  depCache: {
    "app.js": [
      "./model/core/security/index",
      "aurelia-framework",
      "aurelia-router",
      "./main/settings/settings",
      "jquery",
      "semantic-ui"
    ],
    "auth/auth.js": [
      "aurelia-framework",
      "aurelia-dependency-injection",
      "jquery",
      "semantic-ui"
    ],
    "auth/login/login.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "aurelia-dependency-injection",
      "../../model/core/security/user",
      "../../storage/local/local-storage",
      "../../model/core/security/token",
      "../auth"
    ],
    "auth/signup/signup.js": [
      "aurelia-fetch-client",
      "aurelia-dependency-injection",
      "aurelia-framework",
      "../../model/core/security/user",
      "../auth",
      "aurelia-router"
    ],
    "common/elements/profile-dropdown.js": [
      "../../model/core/security/user",
      "aurelia-framework",
      "aurelia-router",
      "../../model/core/security/token",
      "jquery"
    ],
    "common/sidenav/sidenav.js": [
      "aurelia-framework",
      "aurelia-router"
    ],
    "initialize/initialize.js": [
      "../model/core/application",
      "../model/core/security/index",
      "aurelia-framework",
      "aurelia-fetch-client",
      "aurelia-router"
    ],
    "main.js": [
      "aurelia-fetch-client",
      "./storage/local/local-storage",
      "./model/core/security/index",
      "jquery",
      "fetch"
    ],
    "main/applications/applications.js": [
      "jquery"
    ],
    "main/infrastructure/credentials/credentials.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "../../../model/core/security/user",
      "../../../model/core/secret/credentials"
    ],
    "main/infrastructure/infrastructure.js": [
      "../../form/form",
      "aurelia-dependency-injection"
    ],
    "main/main.js": [
      "../model/core/security/index",
      "aurelia-framework",
      "jquery",
      "semantic-ui"
    ],
    "main/manage/applications/applications.js": [
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "main/manage/deploy/deploy.js": [
      "aurelia-framework",
      "../../../model/hal/api",
      "aurelia-fetch-client",
      "../../../model/core/secret/credentials"
    ],
    "main/manage/keyrings/keyrings.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "../../../model/core/security/user",
      "../../../model/core/secret/credentials"
    ],
    "main/manage/node_configurations/node_configurations.js": [
      "../../../model/hal/api",
      "aurelia-fetch-client",
      "../../../model/core/security/user",
      "../../../model/core/secret/credentials",
      "aurelia-framework",
      "pnotify"
    ],
    "main/manage/nodeconfigs/nodeconfigs.js": [
      "aurelia-framework",
      "../../../model/hal/api",
      "aurelia-fetch-client"
    ],
    "main/settings/admin/admin.js": [
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "main/settings/profile/profile.js": [
      "../../../model/core/security/user",
      "aurelia-framework"
    ],
    "main/workspace/builder/abstract-graph.js": [
      "mxgraph",
      "aurelia-pal"
    ],
    "main/workspace/builder/applications/applications.js": [
      "../../../../task/infrastructure",
      "../../../../task/tasks",
      "aurelia-framework",
      "aurelia-fetch-client",
      "pnotify",
      "../abstract-graph",
      "../../../../utils/uuid",
      "../builder",
      "../graph/builder",
      "utils/registry",
      "../cells/deployment",
      "pnotify.callbacks"
    ],
    "main/workspace/builder/applications/sidebars/right-sidebar/bottom/applications.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "../../../../../../../utils/events"
    ],
    "main/workspace/builder/applications/sidebars/right-sidebar/right-sidebar.js": [
      "aurelia-framework"
    ],
    "main/workspace/builder/applications/sidebars/right-sidebar/top/palette.js": [
      "utils/events",
      "mxgraph",
      "utils/objects",
      "pnotify"
    ],
    "main/workspace/builder/cells/application.js": [
      "mxgraph"
    ],
    "main/workspace/builder/cells/deployment.js": [
      "utils/registry",
      "../graph/vertex",
      "mxgraph",
      "../menu/task-cell",
      "../../../../utils/objects"
    ],
    "main/workspace/builder/graph/builder.js": [
      "mxgraph",
      "./connection-handler",
      "../grid",
      "../listeners/hover-listener"
    ],
    "main/workspace/builder/graph/connection-handler.js": [
      "mxgraph"
    ],
    "main/workspace/builder/graph/vertex.js": [
      "algorithms/graph/graph",
      "mxgraph",
      "utils/objects"
    ],
    "main/workspace/builder/grid.js": [
      "mxgraph"
    ],
    "main/workspace/builder/infrastructure/infrastructure.js": [
      "aurelia-fetch-client",
      "aurelia-framework",
      "../../../../task/tasks",
      "../abstract-graph"
    ],
    "main/workspace/builder/infrastructure/sidemenus/applications.js": [
      "aurelia-fetch-client",
      "aurelia-framework",
      "../../../../../utils/events"
    ],
    "main/workspace/builder/infrastructure/sidemenus/right-menu.js": [
      "aurelia-fetch-client",
      "aurelia-framework",
      "../../../../../utils/events"
    ],
    "main/workspace/builder/listeners/hover-listener.js": [
      "mxgraph"
    ],
    "main/workspace/builder/menu/task-cell.js": [
      "mxgraph"
    ],
    "main/workspace/workspace-router.js": [
      "jquery"
    ],
    "main/workspace/workspaces.js": [
      "aurelia-dependency-injection",
      "./wizards/workspace-wizard"
    ],
    "model/core/security/index.js": [
      "./user",
      "./token"
    ],
    "model/core/security/token.js": [
      "aurelia-framework",
      "../../../storage/local/local-storage",
      "aurelia-fetch-client"
    ],
    "settings/settings.js": [
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "storage/local/local-storage.js": [
      "../../core/exceptions/type-errors"
    ],
    "task/tasks.js": [
      "utils/observer",
      "algorithms/graph/graph",
      "algorithms/graph/tarjans",
      "../utils/uuid"
    ]
  }
});