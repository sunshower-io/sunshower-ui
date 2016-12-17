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
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.1",
    "aurelia-dialog": "npm:aurelia-dialog@1.0.0-beta.3.0.1",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.1.0",
    "aurelia-framework": "npm:aurelia-framework@1.0.8",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
    "aurelia-pal": "npm:aurelia-pal@1.2.0",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.1.0",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.1.1",
    "aurelia-router": "npm:aurelia-router@1.1.0",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.1.0",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.2.0",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.1",
    "bluebird": "npm:bluebird@3.4.1",
    "bootstrap": "github:twbs/bootstrap@3.3.7",
    "css": "github:systemjs/plugin-css@0.1.32",
    "cytoscape": "npm:cytoscape@2.7.13",
    "cytoscape-edgehandles": "npm:cytoscape-edgehandles@2.7.1",
    "cytoscape-grid-guide": "npm:cytoscape-grid-guide@1.0.3",
    "cytoscape-node-resize": "npm:cytoscape-node-resize@1.0.10",
    "cytoscape-node-resize:n": "npm:cytoscape-node-resize@1.0.10",
    "dropzone": "github:enyo/dropzone@4.3.0",
    "edge-editiation": "github:frankiex/cytoscape.js-edge-editation@master",
    "element-queries": "github:marcj/css-element-queries@0.3.2",
    "enyo/dropzone": "github:enyo/dropzone@4.3.0",
    "fetch": "github:github/fetch@1.1.1",
    "font-awesome": "npm:font-awesome@4.6.3",
    "jquery": "npm:jquery@2.2.4",
    "mxgraph": "github:jgraph/mxgraph-js@master",
    "ocanvas": "npm:ocanvas@2.8.6",
    "plugin-text": "npm:systemjs-plugin-text@0.0.9",
    "pnotify": "github:sciactive/pnotify@3.0.0",
    "pnotify.callbacks": "github:sciactive/pnotify@3.0.0/dist/pnotify.callbacks",
    "semantic-ui": "github:Semantic-Org/Semantic-UI@2.2.6",
    "text": "github:systemjs/plugin-text@0.0.9",
    "github:Semantic-Org/Semantic-UI@2.2.6": {
      "css": "github:systemjs/plugin-css@0.1.32",
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
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.4"
    },
    "npm:aurelia-binding@1.1.0": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0"
    },
    "npm:aurelia-bootstrapper@1.0.1": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-framework": "npm:aurelia-framework@1.0.8",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.1.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.4",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.1.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.2.0",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.1"
    },
    "npm:aurelia-dependency-injection@1.2.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-dialog@1.0.0-beta.3.0.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.4"
    },
    "npm:aurelia-event-aggregator@1.0.1": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0"
    },
    "npm:aurelia-framework@1.0.8": {
      "aurelia-binding": "npm:aurelia-binding@1.1.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.4"
    },
    "npm:aurelia-history-browser@1.0.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-loader-default@1.0.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-loader@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-logging-console@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0"
    },
    "npm:aurelia-metadata@1.0.2": {
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-pal-browser@1.1.0": {
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-polyfills@1.1.1": {
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-route-recognizer@1.1.0": {
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-router@1.1.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.1",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.1.0"
    },
    "npm:aurelia-task-queue@1.1.0": {
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-templating-binding@1.1.0": {
      "aurelia-binding": "npm:aurelia-binding@1.1.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.4"
    },
    "npm:aurelia-templating-resources@1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.1.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.4"
    },
    "npm:aurelia-templating-router@1.0.1": {
      "aurelia-binding": "npm:aurelia-binding@1.1.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.1",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.4"
    },
    "npm:aurelia-templating@1.1.4": {
      "aurelia-binding": "npm:aurelia-binding@1.1.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
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
    "npm:cytoscape-edgehandles@2.7.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "cytoscape": "npm:cytoscape@2.7.13",
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
    "npm:cytoscape@2.7.13": {
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:font-awesome@4.6.3": {
      "css": "github:systemjs/plugin-css@0.1.32"
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
      "github:Semantic-Org/Semantic-UI@2.2.6.js",
      "github:Semantic-Org/Semantic-UI@2.2.6/semantic.js",
      "github:github/fetch@1.1.1.js",
      "github:github/fetch@1.1.1/fetch.js",
      "npm:aurelia-animator-css@1.0.1.js",
      "npm:aurelia-animator-css@1.0.1/aurelia-animator-css.js",
      "npm:aurelia-binding@1.1.0.js",
      "npm:aurelia-binding@1.1.0/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.1.js",
      "npm:aurelia-bootstrapper@1.0.1/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.2.1.js",
      "npm:aurelia-dependency-injection@1.2.1/aurelia-dependency-injection.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/ai-dialog-body.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/ai-dialog-footer.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/ai-dialog-header.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/ai-dialog.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/attach-focus.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/aurelia-dialog.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-configuration.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-controller.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-options.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-renderer.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-result.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-service.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/lifecycle.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/renderer.js",
      "npm:aurelia-event-aggregator@1.0.1.js",
      "npm:aurelia-event-aggregator@1.0.1/aurelia-event-aggregator.js",
      "npm:aurelia-fetch-client@1.1.0.js",
      "npm:aurelia-fetch-client@1.1.0/aurelia-fetch-client.js",
      "npm:aurelia-framework@1.0.8.js",
      "npm:aurelia-framework@1.0.8/aurelia-framework.js",
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
      "npm:aurelia-logging@1.2.0.js",
      "npm:aurelia-logging@1.2.0/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.2.js",
      "npm:aurelia-metadata@1.0.2/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.1.0.js",
      "npm:aurelia-pal-browser@1.1.0/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.2.0.js",
      "npm:aurelia-pal@1.2.0/aurelia-pal.js",
      "npm:aurelia-path@1.1.1.js",
      "npm:aurelia-path@1.1.1/aurelia-path.js",
      "npm:aurelia-polyfills@1.1.1.js",
      "npm:aurelia-polyfills@1.1.1/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.1.0.js",
      "npm:aurelia-route-recognizer@1.1.0/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.1.0.js",
      "npm:aurelia-router@1.1.0/aurelia-router.js",
      "npm:aurelia-task-queue@1.1.0.js",
      "npm:aurelia-task-queue@1.1.0/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.1.0.js",
      "npm:aurelia-templating-binding@1.1.0/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.2.0.js",
      "npm:aurelia-templating-resources@1.2.0/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.2.0/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.2.0/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.2.0/attr-binding-behavior.js",
      "npm:aurelia-templating-resources@1.2.0/aurelia-hide-style.js",
      "npm:aurelia-templating-resources@1.2.0/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.2.0/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.2.0/binding-signaler.js",
      "npm:aurelia-templating-resources@1.2.0/compose.js",
      "npm:aurelia-templating-resources@1.2.0/css-resource.js",
      "npm:aurelia-templating-resources@1.2.0/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.2.0/dynamic-element.js",
      "npm:aurelia-templating-resources@1.2.0/focus.js",
      "npm:aurelia-templating-resources@1.2.0/hide.js",
      "npm:aurelia-templating-resources@1.2.0/html-resource-plugin.js",
      "npm:aurelia-templating-resources@1.2.0/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.2.0/if.js",
      "npm:aurelia-templating-resources@1.2.0/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.2.0/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.2.0/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.2.0/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.2.0/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.2.0/repeat.js",
      "npm:aurelia-templating-resources@1.2.0/replaceable.js",
      "npm:aurelia-templating-resources@1.2.0/sanitize-html.js",
      "npm:aurelia-templating-resources@1.2.0/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.2.0/show.js",
      "npm:aurelia-templating-resources@1.2.0/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.2.0/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.2.0/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.2.0/with.js",
      "npm:aurelia-templating-router@1.0.1.js",
      "npm:aurelia-templating-router@1.0.1/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.0.1/route-href.js",
      "npm:aurelia-templating-router@1.0.1/route-loader.js",
      "npm:aurelia-templating-router@1.0.1/router-view.js",
      "npm:aurelia-templating@1.1.4.js",
      "npm:aurelia-templating@1.1.4/aurelia-templating.js",
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
      "common/elements/menu.html!github:systemjs/plugin-text@0.0.9.js",
      "common/elements/menu.js",
      "common/elements/nav-bar.html!github:systemjs/plugin-text@0.0.9.js",
      "common/elements/page-header.html!github:systemjs/plugin-text@0.0.9.js",
      "common/elements/profile-dropdown.html!github:systemjs/plugin-text@0.0.9.js",
      "common/elements/profile-dropdown.js",
      "common/renderers/semantic-ui-renderer.js",
      "common/sidenav/sidenav.html!github:systemjs/plugin-text@0.0.9.js",
      "common/sidenav/sidenav.js",
      "core/exceptions/type-errors.js",
      "core/trait.js",
      "elements/element-manager.js",
      "elements/element.js",
      "elements/elements.js",
      "elements/events.js",
      "graph/graph-manager.js",
      "initialize/initialize.html!github:systemjs/plugin-text@0.0.9.js",
      "initialize/initialize.js",
      "main.js",
      "main/main.html!github:systemjs/plugin-text@0.0.9.js",
      "main/main.js",
      "main/nav-bar.html!github:systemjs/plugin-text@0.0.9.js",
      "main/settings/admin/admin.html!github:systemjs/plugin-text@0.0.9.js",
      "main/settings/admin/admin.js",
      "main/settings/hfs/hfs.html!github:systemjs/plugin-text@0.0.9.js",
      "main/settings/hfs/hfs.js",
      "main/settings/profile/profile.html!github:systemjs/plugin-text@0.0.9.js",
      "main/settings/profile/profile.js",
      "main/settings/settings.html!github:systemjs/plugin-text@0.0.9.js",
      "main/settings/settings.js",
      "main/workspace/draftboards/abstract-graph.js",
      "main/workspace/draftboards/applications/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/applications/applications.js",
      "main/workspace/draftboards/applications/components/add-infrastructure.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/applications/components/add-infrastructure.js",
      "main/workspace/draftboards/applications/components/infrastructure.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/applications/components/infrastructure.js",
      "main/workspace/draftboards/applications/components/properties.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/applications/components/properties.js",
      "main/workspace/draftboards/applications/menus/edit-menu.js",
      "main/workspace/draftboards/applications/menus/file-menu.js",
      "main/workspace/draftboards/applications/menus/file/save-dialog.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/applications/menus/file/save-dialog.js",
      "main/workspace/draftboards/applications/menus/group.js",
      "main/workspace/draftboards/applications/menus/maximize.js",
      "main/workspace/draftboards/applications/menus/misc-menus.js",
      "main/workspace/draftboards/applications/menus/view-menu.js",
      "main/workspace/draftboards/applications/menus/zoom.js",
      "main/workspace/draftboards/applications/sidebars/controls.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/applications/sidebars/group-menu/overlay.js",
      "main/workspace/draftboards/applications/sidebars/left-sidebar/bottom/layers.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/applications/sidebars/left-sidebar/bottom/layers.js",
      "main/workspace/draftboards/applications/sidebars/left-sidebar/left-sidebar.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/applications/sidebars/left-sidebar/left-sidebar.js",
      "main/workspace/draftboards/applications/sidebars/right-sidebar/bottom/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/applications/sidebars/right-sidebar/bottom/applications.js",
      "main/workspace/draftboards/applications/sidebars/right-sidebar/right-sidebar.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/applications/sidebars/right-sidebar/right-sidebar.js",
      "main/workspace/draftboards/applications/sidebars/right-sidebar/top/palette.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/applications/sidebars/right-sidebar/top/palette.js",
      "main/workspace/draftboards/applications/sidebars/right-sidebar/top/properties.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/applications/sidebars/right-sidebar/top/properties.js",
      "main/workspace/draftboards/applications/sidebars/sidebar.js",
      "main/workspace/draftboards/cells/cloud.js",
      "main/workspace/draftboards/cells/configuration.js",
      "main/workspace/draftboards/cells/deployment.js",
      "main/workspace/draftboards/cells/infrastructure.js",
      "main/workspace/draftboards/cells/layer.js",
      "main/workspace/draftboards/cells/node.js",
      "main/workspace/draftboards/draftboard.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/draftboard.js",
      "main/workspace/draftboards/editor.js",
      "main/workspace/draftboards/graph/builder.js",
      "main/workspace/draftboards/graph/connection-handler.js",
      "main/workspace/draftboards/graph/vertex-handler.js",
      "main/workspace/draftboards/graph/vertex.js",
      "main/workspace/draftboards/grid-view/grid-view.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/draftboards/grid-view/grid-view.js",
      "main/workspace/draftboards/grid.js",
      "main/workspace/draftboards/listeners/hover-listener.js",
      "main/workspace/draftboards/menu/task-cell.js",
      "main/workspace/navigator/navigator.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/navigator/navigator.js",
      "main/workspace/workspace.html!github:systemjs/plugin-text@0.0.9.js",
      "main/workspace/workspace.js",
      "model/core/application.js",
      "model/core/secret/credentials.js",
      "model/core/security/context.js",
      "model/core/security/index.js",
      "model/core/security/token.js",
      "model/core/security/user.js",
      "model/hal/api.js",
      "model/hal/image.js",
      "model/os.js",
      "storage/local/local-storage.js",
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
    "common/elements/menu.js": [
      "aurelia-framework"
    ],
    "common/elements/profile-dropdown.js": [
      "../../model/core/security/user",
      "aurelia-framework",
      "aurelia-router",
      "../../model/core/security/token",
      "jquery"
    ],
    "common/renderers/semantic-ui-renderer.js": [
      "aurelia-pal"
    ],
    "common/sidenav/sidenav.js": [
      "aurelia-framework",
      "aurelia-router"
    ],
    "elements/element-manager.js": [
      "./events",
      "utils/observer"
    ],
    "elements/elements.js": [
      "utils/uuid"
    ],
    "elements/events.js": [
      "utils/observer"
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
      "common/renderers/semantic-ui-renderer",
      "jquery",
      "fetch"
    ],
    "main/main.js": [
      "../model/core/security/index",
      "aurelia-framework",
      "jquery",
      "semantic-ui"
    ],
    "main/settings/admin/admin.js": [
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "main/settings/profile/profile.js": [
      "../../../model/core/security/user",
      "aurelia-framework"
    ],
    "main/workspace/draftboards/abstract-graph.js": [
      "mxgraph",
      "aurelia-pal"
    ],
    "main/workspace/draftboards/applications/applications.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "pnotify",
      "../abstract-graph",
      "../draftboard",
      "../graph/builder",
      "utils/registry",
      "./menus/file-menu",
      "./menus/edit-menu",
      "./menus/view-menu",
      "./menus/zoom",
      "./menus/maximize",
      "./menus/misc-menus",
      "aurelia-dialog",
      "pnotify.callbacks"
    ],
    "main/workspace/draftboards/applications/components/add-infrastructure.js": [
      "aurelia-framework"
    ],
    "main/workspace/draftboards/applications/components/infrastructure.js": [
      "model/os",
      "aurelia-framework"
    ],
    "main/workspace/draftboards/applications/menus/edit-menu.js": [
      "common/elements/menu"
    ],
    "main/workspace/draftboards/applications/menus/file-menu.js": [
      "common/elements/menu",
      "./file/save-dialog"
    ],
    "main/workspace/draftboards/applications/menus/maximize.js": [
      "common/elements/menu"
    ],
    "main/workspace/draftboards/applications/menus/misc-menus.js": [
      "common/elements/menu"
    ],
    "main/workspace/draftboards/applications/menus/view-menu.js": [
      "common/elements/menu"
    ],
    "main/workspace/draftboards/applications/menus/zoom.js": [
      "common/elements/menu"
    ],
    "main/workspace/draftboards/applications/sidebars/left-sidebar/bottom/layers.js": [
      "aurelia-framework",
      "elements/element-manager"
    ],
    "main/workspace/draftboards/applications/sidebars/right-sidebar/bottom/applications.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "utils/events",
      "main/workspace/draftboards/cells/node",
      "utils/registry",
      "elements/elements"
    ],
    "main/workspace/draftboards/applications/sidebars/right-sidebar/right-sidebar.js": [
      "../sidebar"
    ],
    "main/workspace/draftboards/applications/sidebars/right-sidebar/top/palette.js": [
      "utils/events",
      "elements/elements",
      "main/workspace/draftboards/cells/node",
      "utils/registry",
      "aurelia-framework",
      "pnotify"
    ],
    "main/workspace/draftboards/applications/sidebars/sidebar.js": [
      "aurelia-framework"
    ],
    "main/workspace/draftboards/cells/deployment.js": [
      "utils/registry",
      "../graph/vertex",
      "mxgraph"
    ],
    "main/workspace/draftboards/cells/layer.js": [
      "../graph/vertex",
      "utils/uuid"
    ],
    "main/workspace/draftboards/cells/node.js": [
      "mxgraph",
      "elements/elements",
      "./layer",
      "./deployment",
      "elements/events",
      "../menu/task-cell"
    ],
    "main/workspace/draftboards/draftboard.js": [
      "aurelia-framework",
      "common/elements/menu"
    ],
    "main/workspace/draftboards/graph/builder.js": [
      "mxgraph",
      "./connection-handler",
      "../grid"
    ],
    "main/workspace/draftboards/graph/connection-handler.js": [
      "mxgraph"
    ],
    "main/workspace/draftboards/graph/vertex-handler.js": [
      "mxgraph"
    ],
    "main/workspace/draftboards/graph/vertex.js": [
      "algorithms/graph/graph",
      "mxgraph",
      "utils/objects"
    ],
    "main/workspace/draftboards/grid.js": [
      "mxgraph"
    ],
    "main/workspace/draftboards/listeners/hover-listener.js": [
      "mxgraph"
    ],
    "main/workspace/draftboards/menu/task-cell.js": [
      "utils/objects",
      "utils/uuid",
      "../graph/vertex"
    ],
    "main/workspace/navigator/navigator.js": [
      "aurelia-router",
      "aurelia-framework"
    ],
    "main/workspace/workspace.js": [
      "aurelia-framework",
      "jquery"
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
    "model/os.js": [
      "../utils/uuid"
    ],
    "storage/local/local-storage.js": [
      "../../core/exceptions/type-errors"
    ],
    "utils/registry.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "graph/graph-manager",
      "elements/element-manager"
    ]
  }
});