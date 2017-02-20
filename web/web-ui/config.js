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
    "stackblur": {
      "format": "global"
    },
    "rgbcolor": {
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
    "aurelia-animator-velocity": "npm:aurelia-animator-velocity@1.0.1",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.1",
    "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
    "aurelia-dialog": "npm:aurelia-dialog@1.0.0-beta.3.0.1",
    "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
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
    "aurelia-validation": "npm:aurelia-validation@1.0.0-beta.1.0.1",
    "bluebird": "npm:bluebird@3.4.1",
    "bootstrap": "github:twbs/bootstrap@3.3.7",
    "buffer": "github:jspm/nodelibs-buffer@0.1.0",
    "canvg": "github:canvg/canvg@master",
    "canvg/canvg": "github:canvg/canvg@master",
    "css": "github:systemjs/plugin-css@0.1.32",
    "cytoscape": "npm:cytoscape@2.7.13",
    "cytoscape-edgehandles": "npm:cytoscape-edgehandles@2.7.1",
    "cytoscape-grid-guide": "npm:cytoscape-grid-guide@1.0.4",
    "cytoscape-node-resize": "npm:cytoscape-node-resize@1.0.10",
    "cytoscape-node-resize:n": "npm:cytoscape-node-resize@1.0.10",
    "d3": "npm:d3@3.5.17",
    "d3-geo-projection": "github:d3/d3-geo-projection@1.2.1",
    "d3/d3-geo-projection": "github:d3/d3-geo-projection@1.2.1",
    "datamaps": "github:markmarkoh/datamaps@0.5.8",
    "dropzone": "github:enyo/dropzone@4.3.0",
    "edge-editiation": "github:frankiex/cytoscape.js-edge-editation@master",
    "element-queries": "github:marcj/css-element-queries@0.3.2",
    "enyo/dropzone": "github:enyo/dropzone@4.3.0",
    "fetch": "github:github/fetch@1.1.1",
    "font-awesome": "npm:font-awesome@4.6.3",
    "jquery": "npm:jquery@2.2.4",
    "lodash": "npm:lodash@4.17.4",
    "markmarkoh/datamaps": "github:markmarkoh/datamaps@0.5.8",
    "maskedinput": "github:digitalBush/jquery.maskedinput@1.4.1",
    "mxgraph": "github:jgraph/mxgraph-js@master",
    "ocanvas": "npm:ocanvas@2.8.7",
    "plotly/plotly.js": "github:plotly/plotly.js@1.21.3",
    "plugin-text": "npm:systemjs-plugin-text@0.0.9",
    "pnotify": "github:sciactive/pnotify@3.0.0",
    "pnotify.callbacks": "github:sciactive/pnotify@3.0.0/dist/pnotify.callbacks",
    "rgbcolor": "github:canvg/canvg@master/rgbcolor",
    "rx": "npm:rxjs@5.0.3",
    "semantic-ui": "github:Semantic-Org/Semantic-UI@2.2.7",
    "stackblur": "github:canvg/canvg@master/StackBlur",
    "text": "github:systemjs/plugin-text@0.0.9",
    "topojson": "github:topojson/topojson@2.2.0",
    "topojson/topojson": "github:topojson/topojson@2.2.0",
    "velocity": "github:julianshapiro/velocity@1.4.1",
    "velocity-ui": "github:julianshapiro/velocity@1.4.1/velocity.ui.js",
    "github:Semantic-Org/Semantic-UI@2.2.7": {
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
    "github:julianshapiro/velocity@1.4.1": {
      "velocity-ui": "github:julianshapiro/velocity@1.4.1/velocity.ui.js"
    },
    "github:markmarkoh/datamaps@0.5.8": {
      "d3": "npm:d3@3.5.17",
      "d3-geo-projection": "github:d3/d3-geo-projection@1.2.1"
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
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-animator-velocity@1.0.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0",
      "velocity-animate": "npm:velocity-animate@1.4.0"
    },
    "npm:aurelia-binding@1.1.1": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
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
      "aurelia-templating": "npm:aurelia-templating@1.2.0",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.1.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.2.0",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.1"
    },
    "npm:aurelia-dependency-injection@1.3.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-dialog@1.0.0-beta.3.0.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-event-aggregator@1.0.1": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0"
    },
    "npm:aurelia-framework@1.0.8": {
      "aurelia-binding": "npm:aurelia-binding@1.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-history-browser@1.0.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-loader-default@1.0.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-loader@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-logging-console@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0"
    },
    "npm:aurelia-metadata@1.0.3": {
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
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
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
      "aurelia-binding": "npm:aurelia-binding@1.1.1",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-templating-resources@1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-templating-router@1.0.1": {
      "aurelia-binding": "npm:aurelia-binding@1.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-templating@1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0"
    },
    "npm:aurelia-validation@1.0.0-beta.1.0.1": {
      "aurelia-binding": "npm:aurelia-binding@1.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
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
    "npm:cytoscape-grid-guide@1.0.4": {
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
    "npm:ocanvas@2.8.7": {
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
    "npm:rxjs@5.0.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "symbol-observable": "npm:symbol-observable@1.0.4"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:velocity-animate@1.4.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  },
  bundles: {
    "aurelia.js": [
      "github:Semantic-Org/Semantic-UI@2.2.7.js",
      "github:Semantic-Org/Semantic-UI@2.2.7/semantic.js",
      "github:github/fetch@1.1.1.js",
      "github:github/fetch@1.1.1/fetch.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "npm:aurelia-animator-css@1.0.1.js",
      "npm:aurelia-animator-css@1.0.1/aurelia-animator-css.js",
      "npm:aurelia-animator-velocity@1.0.1.js",
      "npm:aurelia-animator-velocity@1.0.1/aurelia-animator-velocity.js",
      "npm:aurelia-binding@1.1.1.js",
      "npm:aurelia-binding@1.1.1/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.1.js",
      "npm:aurelia-bootstrapper@1.0.1/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.3.0.js",
      "npm:aurelia-dependency-injection@1.3.0/aurelia-dependency-injection.js",
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
      "npm:aurelia-metadata@1.0.3.js",
      "npm:aurelia-metadata@1.0.3/aurelia-metadata.js",
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
      "npm:aurelia-templating@1.2.0.js",
      "npm:aurelia-templating@1.2.0/aurelia-templating.js",
      "npm:jquery@2.2.4.js",
      "npm:jquery@2.2.4/dist/jquery.js",
      "npm:process@0.11.9.js",
      "npm:process@0.11.9/browser.js",
      "npm:velocity-animate@1.4.0.js",
      "npm:velocity-animate@1.4.0/velocity.js",
      "npm:velocity-animate@1.4.0/velocity.ui.js"
    ],
    "app-build.js": [
      "app.html!github:systemjs/plugin-text@0.0.9.js",
      "app.js",
      "apps/auth/auth-nav.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/auth.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/auth.js",
      "apps/auth/login/login.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/login/login.js",
      "apps/auth/signup/signup.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/signup/signup.js",
      "apps/workspaces/index.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/index.js",
      "apps/workspaces/model/activity/activity.js",
      "apps/workspaces/model/blocks.js",
      "apps/workspaces/model/components/block.js",
      "apps/workspaces/model/components/cell.js",
      "apps/workspaces/model/components/cloud.js",
      "apps/workspaces/model/components/deployment.js",
      "apps/workspaces/model/components/infrastructure-node.js",
      "apps/workspaces/model/components/layer.js",
      "apps/workspaces/model/components/security-group.js",
      "apps/workspaces/model/components/vlan.js",
      "apps/workspaces/model/deployment.js",
      "apps/workspaces/model/deployment/deployment-marshaller.js",
      "apps/workspaces/model/deployment/deployment.js",
      "apps/workspaces/model/infrastructure.js",
      "apps/workspaces/model/infrastructure/endpoint.js",
      "apps/workspaces/model/infrastructure/gateway.js",
      "apps/workspaces/model/infrastructure/infrastructure.js",
      "apps/workspaces/model/infrastructure/load-balancer.js",
      "apps/workspaces/resources/custom-elements/properties.js",
      "apps/workspaces/resources/custom-elements/property-editor/property-editor.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/property-editor/property-editor.js",
      "apps/workspaces/resources/editors/cloud.js",
      "apps/workspaces/resources/editors/cloud/basic.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/cloud/basic.js",
      "apps/workspaces/resources/editors/cloud/credentials.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/cloud/credentials.js",
      "apps/workspaces/resources/editors/cloud/full.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/cloud/full.js",
      "apps/workspaces/resources/editors/deployment.js",
      "apps/workspaces/resources/editors/deployment/basic.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/deployment/basic.js",
      "apps/workspaces/resources/editors/deployment/full.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/deployment/full.js",
      "apps/workspaces/resources/editors/infrastructure-node/basic.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/infrastructure-node/basic.js",
      "apps/workspaces/resources/editors/infrastructure-node/cloud.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/infrastructure-node/cloud.js",
      "apps/workspaces/resources/editors/infrastructure-node/credentials.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/infrastructure-node/credentials.js",
      "apps/workspaces/resources/editors/infrastructure-node/full.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/infrastructure-node/full.js",
      "apps/workspaces/resources/editors/infrastructure.js",
      "apps/workspaces/resources/editors/load-balancer/editor.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/load-balancer/editor.js",
      "apps/workspaces/resources/editors/security-group.js",
      "apps/workspaces/resources/editors/security-group/basic.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/security-group/basic.js",
      "apps/workspaces/resources/editors/security-group/full.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/security-group/full.js",
      "apps/workspaces/routes/workspace/applications/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/applications.js",
      "apps/workspaces/routes/workspace/clouds/add-cloud.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/clouds/add-cloud.js",
      "apps/workspaces/routes/workspace/clouds/add-credential.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/clouds/add-credential.js",
      "apps/workspaces/routes/workspace/clouds/clouds.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/clouds/clouds.js",
      "apps/workspaces/routes/workspace/dashboard/dashboard.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/dashboard/dashboard.js",
      "apps/workspaces/routes/workspace/designer/abstract-graph.js",
      "apps/workspaces/routes/workspace/designer/applications/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/applications.js",
      "apps/workspaces/routes/workspace/designer/applications/components/add-infrastructure.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/components/add-infrastructure.js",
      "apps/workspaces/routes/workspace/designer/applications/components/infrastructure.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/components/infrastructure.js",
      "apps/workspaces/routes/workspace/designer/applications/components/properties.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/components/properties.js",
      "apps/workspaces/routes/workspace/designer/applications/element-editor.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/element-editor.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/delete-cells.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/deploy-menu.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/edit-menu.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/execution-order.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/execution/execution-dialog.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/execution/execution-dialog.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/file-menu.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/file/deploy-dialog.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/file/deploy-dialog.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/file/save-dialog.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/file/save-dialog.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/group.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/maximize.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/misc-menus.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/view-menu.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/zoom.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/controls.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/group-menu/overlay.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/left-sidebar/bottom/layers.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/left-sidebar/bottom/layers.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/left-sidebar/left-sidebar.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/left-sidebar/left-sidebar.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/bottom/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/bottom/applications.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/bottom/blocks.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/bottom/blocks.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/bottom/components.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/bottom/components.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/right-sidebar.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/right-sidebar.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/top/editor.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/top/editor.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/top/palette.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/top/palette.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/top/properties.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/top/properties.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/sidebar.js",
      "apps/workspaces/routes/workspace/designer/breadcrumb/breadcrumb.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/breadcrumb/breadcrumb.js",
      "apps/workspaces/routes/workspace/designer/context-menu/actions.js",
      "apps/workspaces/routes/workspace/designer/context-menu/create-block.js",
      "apps/workspaces/routes/workspace/designer/context-menu/create-cloud.js",
      "apps/workspaces/routes/workspace/designer/context-menu/create-group.js",
      "apps/workspaces/routes/workspace/designer/context-menu/create-layer.js",
      "apps/workspaces/routes/workspace/designer/context-menu/create-security-group.js",
      "apps/workspaces/routes/workspace/designer/context-menu/create-vlan.js",
      "apps/workspaces/routes/workspace/designer/context-menu/dialogs/group-items-as-dialog.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/context-menu/dialogs/group-items-as-dialog.js",
      "apps/workspaces/routes/workspace/designer/default-action-set.js",
      "apps/workspaces/routes/workspace/designer/designer.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/designer.js",
      "apps/workspaces/routes/workspace/designer/editor.js",
      "apps/workspaces/routes/workspace/designer/listeners/hover-listener.js",
      "apps/workspaces/routes/workspace/index.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/index.js",
      "apps/workspaces/routes/workspace/instances/instances.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/instances/instances.js",
      "apps/workspaces/routes/workspace/instances/new.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/instances/new.js",
      "apps/workspaces/routes/workspace/settings/settings.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/settings/settings.js",
      "apps/workspaces/routes/workspace/workspaces/workspaces.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/workspaces/workspaces.js",
      "apps/workspaces/services/blocks.js",
      "apps/workspaces/services/blocks/block.js",
      "apps/workspaces/services/draftboard.js",
      "apps/workspaces/services/draftboard/draftboard.js",
      "apps/workspaces/services/draftboard/marshallers/marshaller.js",
      "apps/workspaces/services/infrastructure/infrastructure-manager.js",
      "common/lib/algorithms/graph.js",
      "common/lib/algorithms/graph/graph.js",
      "common/lib/algorithms/graph/scheduling.js",
      "common/lib/algorithms/graph/tarjans.js",
      "common/lib/canvas.js",
      "common/lib/canvas/actions.js",
      "common/lib/canvas/actions/action-service.js",
      "common/lib/canvas/core/canvas-model.js",
      "common/lib/canvas/core/canvas.js",
      "common/lib/canvas/core/cell-renderer.js",
      "common/lib/canvas/core/connection-handler.js",
      "common/lib/canvas/core/graph-handler.js",
      "common/lib/canvas/core/grid/grid.js",
      "common/lib/canvas/core/menu-selection.js",
      "common/lib/canvas/core/selection-handler.js",
      "common/lib/canvas/core/vertex-handler.js",
      "common/lib/canvas/element.js",
      "common/lib/canvas/element/element.js",
      "common/lib/canvas/element/events.js",
      "common/lib/canvas/element/registry-aware.js",
      "common/lib/canvas/events/canvas-events.js",
      "common/lib/canvas/interchange.js",
      "common/lib/canvas/interchange/interchange.js",
      "common/lib/canvas/interchange/jsongraph.js",
      "common/lib/canvas/menu/action.js",
      "common/lib/canvas/menu/task-cell.js",
      "common/lib/canvas/scene-graph/scene-graph.js",
      "common/lib/canvas/utilities.js",
      "common/lib/geometry.js",
      "common/lib/geometry/shapes.js",
      "common/lib/io/marshalling.js",
      "common/lib/io/marshalling/marshaller.js",
      "common/lib/lang.js",
      "common/lib/lang/class.js",
      "common/lib/storage.js",
      "common/lib/storage/application-state.js",
      "common/lib/storage/local.js",
      "common/lib/storage/local/local-storage.js",
      "common/lib/utils.js",
      "common/lib/utils/diagram/image-export.js",
      "common/lib/utils/events.js",
      "common/lib/utils/objects.js",
      "common/lib/utils/observer.js",
      "common/lib/utils/progress.js",
      "common/lib/utils/registry.js",
      "common/lib/utils/uuid.js",
      "common/lib/widget.js",
      "common/lib/widget/menu.js",
      "common/lib/widget/menu/components.js",
      "common/lib/widget/menu/menu.html!github:systemjs/plugin-text@0.0.9.js",
      "common/lib/widget/menu/menu.js",
      "common/model/api/core.js",
      "common/model/api/core/application.js",
      "common/model/api/hal.js",
      "common/model/api/hal/api.js",
      "common/model/api/hal/cloud.js",
      "common/model/api/hal/compute.js",
      "common/model/api/hal/image.js",
      "common/model/api/hal/os.js",
      "common/model/security.js",
      "common/model/security/credentials.js",
      "common/model/security/token.js",
      "common/model/security/user.js",
      "common/resources/custom-components/semantic-ui-renderer.js",
      "common/resources/custom-elements/nav-bar/navbar.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/navbar.js",
      "common/resources/custom-elements/nav-bar/page-header.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/profile-dropdown.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/profile-dropdown.js",
      "common/resources/custom-elements/tree.js",
      "common/resources/custom-elements/tree/node.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/tree/node.js",
      "common/resources/custom-elements/tree/tree.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/tree/tree.js",
      "main.js"
    ]
  },
  depCache: {
    "app.js": [
      "aurelia-framework",
      "aurelia-router",
      "common/model/security",
      "jquery",
      "semantic-ui"
    ],
    "apps/auth/auth.js": [
      "aurelia-framework",
      "aurelia-dependency-injection",
      "jquery",
      "semantic-ui"
    ],
    "apps/auth/login/login.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "aurelia-dependency-injection",
      "common/model/security",
      "common/lib/storage/local",
      "apps/auth/auth"
    ],
    "apps/auth/signup/signup.js": [
      "aurelia-dependency-injection",
      "aurelia-framework",
      "apps/auth/auth",
      "common/model/security",
      "aurelia-router",
      "aurelia-fetch-client"
    ],
    "apps/workspaces/model/blocks.js": [
      "./components/block"
    ],
    "apps/workspaces/model/components/block.js": [
      "./layer",
      "common/lib/canvas/element",
      "mxgraph",
      "apps/workspaces/services/blocks/block",
      "apps/workspaces/services/draftboard/draftboard"
    ],
    "apps/workspaces/model/components/cloud.js": [
      "./layer",
      "common/lib/canvas/element",
      "mxgraph",
      "apps/workspaces/resources/editors/cloud",
      "apps/workspaces/services/draftboard/draftboard"
    ],
    "apps/workspaces/model/components/deployment.js": [
      "common/lib/utils",
      "mxgraph",
      "common/lib/canvas/element",
      "apps/workspaces/resources/editors/deployment",
      "apps/workspaces/services/draftboard/draftboard"
    ],
    "apps/workspaces/model/components/infrastructure-node.js": [
      "mxgraph",
      "common/lib/canvas/element",
      "common/lib/canvas/actions",
      "apps/workspaces/resources/editors/infrastructure",
      "common/model/api/hal",
      "apps/workspaces/services/draftboard/draftboard"
    ],
    "apps/workspaces/model/components/layer.js": [
      "common/lib/canvas/element",
      "mxgraph",
      "common/lib/utils",
      "apps/workspaces/services/draftboard/draftboard"
    ],
    "apps/workspaces/model/components/security-group.js": [
      "./layer",
      "common/lib/canvas/element",
      "apps/workspaces/resources/editors/security-group",
      "apps/workspaces/services/draftboard/draftboard"
    ],
    "apps/workspaces/model/components/vlan.js": [
      "./layer",
      "common/lib/canvas/element",
      "apps/workspaces/services/draftboard/draftboard"
    ],
    "apps/workspaces/model/deployment.js": [
      "./components/deployment"
    ],
    "apps/workspaces/model/deployment/deployment-marshaller.js": [
      "apps/workspaces/services/draftboard/marshallers/marshaller"
    ],
    "apps/workspaces/model/infrastructure.js": [
      "./infrastructure/gateway",
      "./infrastructure/endpoint",
      "./infrastructure/infrastructure",
      "./infrastructure/load-balancer",
      "./components/infrastructure-node"
    ],
    "apps/workspaces/model/infrastructure/endpoint.js": [
      "mxgraph",
      "./infrastructure"
    ],
    "apps/workspaces/model/infrastructure/gateway.js": [
      "mxgraph",
      "./infrastructure"
    ],
    "apps/workspaces/model/infrastructure/infrastructure.js": [
      "mxgraph",
      "common/lib/utils",
      "common/lib/canvas/element"
    ],
    "apps/workspaces/model/infrastructure/load-balancer.js": [
      "mxgraph",
      "./infrastructure",
      "apps/workspaces/resources/editors/load-balancer/editor"
    ],
    "apps/workspaces/resources/custom-elements/properties.js": [
      "./property-editor/property-editor"
    ],
    "apps/workspaces/resources/custom-elements/property-editor/property-editor.js": [
      "aurelia-framework"
    ],
    "apps/workspaces/resources/editors/cloud.js": [
      "./cloud/basic",
      "./cloud/full",
      "./cloud/credentials"
    ],
    "apps/workspaces/resources/editors/cloud/credentials.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "common/model/security",
      "apps/workspaces/model/components/cloud"
    ],
    "apps/workspaces/resources/editors/cloud/full.js": [
      "aurelia-framework",
      "apps/workspaces/model/components/cloud"
    ],
    "apps/workspaces/resources/editors/deployment.js": [
      "./deployment/basic",
      "./deployment/full"
    ],
    "apps/workspaces/resources/editors/infrastructure-node/basic.js": [
      "common/lib/utils",
      "aurelia-fetch-client",
      "aurelia-framework",
      "common/model/api/hal",
      "apps/workspaces/model/infrastructure"
    ],
    "apps/workspaces/resources/editors/infrastructure-node/cloud.js": [
      "aurelia-framework",
      "apps/workspaces/model/components/infrastructure-node"
    ],
    "apps/workspaces/resources/editors/infrastructure-node/credentials.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "common/model/security",
      "apps/workspaces/model/infrastructure"
    ],
    "apps/workspaces/resources/editors/infrastructure-node/full.js": [
      "aurelia-framework",
      "apps/workspaces/model/infrastructure"
    ],
    "apps/workspaces/resources/editors/infrastructure.js": [
      "./infrastructure-node/basic",
      "./infrastructure-node/full",
      "./infrastructure-node/credentials",
      "./infrastructure-node/cloud"
    ],
    "apps/workspaces/resources/editors/security-group.js": [
      "./security-group/basic",
      "./security-group/full"
    ],
    "apps/workspaces/resources/editors/security-group/full.js": [
      "aurelia-framework",
      "apps/workspaces/model/components/security-group"
    ],
    "apps/workspaces/routes/workspace/applications/applications.js": [
      "aurelia-fetch-client",
      "aurelia-framework",
      "apps/workspaces/routes/workspace/index"
    ],
    "apps/workspaces/routes/workspace/clouds/add-cloud.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "common/model/api/hal/api",
      "apps/workspaces/routes/workspace/index"
    ],
    "apps/workspaces/routes/workspace/clouds/add-credential.js": [
      "aurelia-framework",
      "common/model/api/hal/api",
      "common/model/security/credentials",
      "aurelia-fetch-client",
      "apps/workspaces/routes/workspace/index"
    ],
    "apps/workspaces/routes/workspace/clouds/clouds.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "apps/workspaces/routes/workspace/index"
    ],
    "apps/workspaces/routes/workspace/dashboard/dashboard.js": [
      "aurelia-framework"
    ],
    "apps/workspaces/routes/workspace/designer/abstract-graph.js": [
      "mxgraph",
      "aurelia-pal",
      "rx"
    ],
    "apps/workspaces/routes/workspace/designer/applications/applications.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "aurelia-event-aggregator",
      "pnotify",
      "mxgraph",
      "../abstract-graph",
      "../designer",
      "common/lib/utils",
      "./menus/file-menu",
      "./menus/edit-menu",
      "./menus/view-menu",
      "./menus/zoom",
      "./menus/maximize",
      "apps/workspaces/services/draftboard",
      "common/lib/canvas",
      "aurelia-dialog",
      "./menus/misc-menus",
      "common/lib/canvas/actions",
      "common/lib/storage",
      "./menus/execution-order",
      "../default-action-set",
      "pnotify.callbacks"
    ],
    "apps/workspaces/routes/workspace/designer/applications/components/add-infrastructure.js": [
      "aurelia-framework"
    ],
    "apps/workspaces/routes/workspace/designer/applications/components/infrastructure.js": [
      "common/model/api/hal",
      "aurelia-framework"
    ],
    "apps/workspaces/routes/workspace/designer/applications/element-editor.js": [
      "aurelia-framework"
    ],
    "apps/workspaces/routes/workspace/designer/applications/menus/delete-cells.js": [
      "common/lib/widget"
    ],
    "apps/workspaces/routes/workspace/designer/applications/menus/deploy-menu.js": [
      "common/lib/widget",
      "./file/deploy-dialog"
    ],
    "apps/workspaces/routes/workspace/designer/applications/menus/edit-menu.js": [
      "common/lib/widget",
      "./delete-cells"
    ],
    "apps/workspaces/routes/workspace/designer/applications/menus/execution-order.js": [
      "common/lib/widget",
      "./execution/execution-dialog"
    ],
    "apps/workspaces/routes/workspace/designer/applications/menus/execution/execution-dialog.js": [
      "lodash",
      "aurelia-framework",
      "common/lib/algorithms/graph",
      "apps/workspaces/services/draftboard/draftboard"
    ],
    "apps/workspaces/routes/workspace/designer/applications/menus/file-menu.js": [
      "common/lib/widget",
      "./file/save-dialog",
      "./deploy-menu"
    ],
    "apps/workspaces/routes/workspace/designer/applications/menus/file/deploy-dialog.js": [
      "aurelia-framework",
      "lodash",
      "aurelia-fetch-client",
      "common/model/security/credentials",
      "apps/workspaces/model/deployment/deployment",
      "apps/workspaces/services/draftboard/draftboard",
      "apps/workspaces/model/components/infrastructure-node",
      "apps/workspaces/model/deployment/deployment-marshaller"
    ],
    "apps/workspaces/routes/workspace/designer/applications/menus/file/save-dialog.js": [
      "apps/workspaces/services/draftboard",
      "aurelia-framework",
      "common/lib/utils/diagram/image-export",
      "canvg/rgbcolor",
      "canvg/StackBlur"
    ],
    "apps/workspaces/routes/workspace/designer/applications/menus/maximize.js": [
      "common/lib/widget"
    ],
    "apps/workspaces/routes/workspace/designer/applications/menus/misc-menus.js": [
      "common/lib/widget"
    ],
    "apps/workspaces/routes/workspace/designer/applications/menus/view-menu.js": [
      "common/lib/widget"
    ],
    "apps/workspaces/routes/workspace/designer/applications/menus/zoom.js": [
      "common/lib/widget"
    ],
    "apps/workspaces/routes/workspace/designer/applications/sidebars/left-sidebar/bottom/layers.js": [
      "aurelia-framework",
      "common/lib/utils",
      "aurelia-event-aggregator",
      "common/lib/canvas",
      "apps/workspaces/services/draftboard/draftboard"
    ],
    "apps/workspaces/routes/workspace/designer/applications/sidebars/left-sidebar/left-sidebar.js": [
      "common/lib/utils",
      "aurelia-fetch-client",
      "aurelia-framework",
      "aurelia-event-aggregator",
      "common/lib/canvas",
      "apps/workspaces/services/draftboard/draftboard"
    ],
    "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/bottom/applications.js": [
      "mxgraph",
      "aurelia-framework",
      "aurelia-fetch-client",
      "common/lib/utils",
      "common/lib/canvas",
      "common/lib/canvas/utilities",
      "apps/workspaces/services/draftboard",
      "apps/workspaces/model/components/deployment",
      "apps/workspaces/model/components/infrastructure-node"
    ],
    "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/bottom/blocks.js": [
      "aurelia-framework",
      "common/lib/canvas",
      "mxgraph",
      "common/lib/utils",
      "apps/workspaces/services/blocks/block",
      "apps/workspaces/services/draftboard/draftboard"
    ],
    "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/bottom/components.js": [
      "aurelia-framework",
      "common/lib/canvas",
      "mxgraph",
      "common/lib/utils",
      "apps/workspaces/services/draftboard/draftboard",
      "apps/workspaces/services/infrastructure/infrastructure-manager"
    ],
    "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/right-sidebar.js": [
      "../sidebar",
      "aurelia-framework",
      "common/lib/canvas"
    ],
    "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/top/editor.js": [
      "common/lib/canvas",
      "aurelia-framework",
      "aurelia-event-aggregator",
      "common/lib/storage"
    ],
    "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/top/palette.js": [
      "common/lib/utils",
      "aurelia-framework",
      "common/lib/canvas/actions",
      "apps/workspaces/model/components/infrastructure-node",
      "pnotify"
    ],
    "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/top/properties.js": [
      "aurelia-framework",
      "aurelia-event-aggregator",
      "common/lib/canvas",
      "aurelia-dependency-injection",
      "common/lib/storage"
    ],
    "apps/workspaces/routes/workspace/designer/applications/sidebars/sidebar.js": [
      "aurelia-framework"
    ],
    "apps/workspaces/routes/workspace/designer/breadcrumb/breadcrumb.js": [
      "aurelia-framework",
      "aurelia-event-aggregator",
      "common/lib/canvas"
    ],
    "apps/workspaces/routes/workspace/designer/context-menu/actions.js": [
      "./create-block",
      "./create-cloud",
      "./create-group",
      "./create-vlan",
      "./create-layer",
      "./create-security-group"
    ],
    "apps/workspaces/routes/workspace/designer/context-menu/create-block.js": [
      "common/lib/canvas/actions",
      "common/lib/canvas",
      "./dialogs/group-items-as-dialog",
      "apps/workspaces/model/components/block"
    ],
    "apps/workspaces/routes/workspace/designer/context-menu/create-cloud.js": [
      "common/lib/canvas",
      "common/lib/canvas/actions",
      "./dialogs/group-items-as-dialog",
      "apps/workspaces/model/components/cloud"
    ],
    "apps/workspaces/routes/workspace/designer/context-menu/create-group.js": [
      "common/lib/canvas",
      "common/lib/canvas/actions",
      "./dialogs/group-items-as-dialog"
    ],
    "apps/workspaces/routes/workspace/designer/context-menu/create-layer.js": [
      "common/lib/canvas",
      "common/lib/canvas/actions",
      "./dialogs/group-items-as-dialog",
      "apps/workspaces/model/components/layer"
    ],
    "apps/workspaces/routes/workspace/designer/context-menu/create-security-group.js": [
      "common/lib/canvas",
      "common/lib/canvas/actions",
      "./dialogs/group-items-as-dialog",
      "apps/workspaces/model/components/security-group"
    ],
    "apps/workspaces/routes/workspace/designer/context-menu/create-vlan.js": [
      "common/lib/canvas",
      "common/lib/canvas/actions",
      "./dialogs/group-items-as-dialog",
      "apps/workspaces/model/components/vlan"
    ],
    "apps/workspaces/routes/workspace/designer/context-menu/dialogs/group-items-as-dialog.js": [
      "common/lib/utils",
      "aurelia-framework",
      "common/lib/canvas"
    ],
    "apps/workspaces/routes/workspace/designer/default-action-set.js": [
      "aurelia-framework",
      "common/lib/canvas/actions",
      "aurelia-dialog",
      "./context-menu/actions"
    ],
    "apps/workspaces/routes/workspace/designer/designer.js": [
      "aurelia-framework",
      "common/lib/widget",
      "common/lib/storage",
      "apps/workspaces/routes/workspace/index"
    ],
    "apps/workspaces/routes/workspace/designer/listeners/hover-listener.js": [
      "mxgraph"
    ],
    "apps/workspaces/routes/workspace/index.js": [
      "aurelia-dependency-injection",
      "aurelia-event-aggregator"
    ],
    "apps/workspaces/routes/workspace/instances/instances.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "apps/workspaces/routes/workspace/index"
    ],
    "apps/workspaces/routes/workspace/instances/new.js": [
      "aurelia-framework",
      "common/lib/utils/uuid",
      "common/model/api/hal/os",
      "apps/workspaces/routes/workspace/index",
      "aurelia-fetch-client",
      "common/model/security/credentials",
      "common/model/api/hal/compute"
    ],
    "apps/workspaces/routes/workspace/workspaces/workspaces.js": [
      "aurelia-router",
      "aurelia-dependency-injection"
    ],
    "apps/workspaces/services/blocks.js": [
      "./blocks/block"
    ],
    "apps/workspaces/services/blocks/block.js": [
      "lodash"
    ],
    "apps/workspaces/services/draftboard.js": [
      "./draftboard/draftboard"
    ],
    "apps/workspaces/services/draftboard/draftboard.js": [
      "common/lib/utils",
      "common/lib/algorithms/graph",
      "aurelia-fetch-client",
      "aurelia-framework",
      "./marshallers/marshaller"
    ],
    "apps/workspaces/services/draftboard/marshallers/marshaller.js": [
      "common/lib/algorithms/graph",
      "apps/workspaces/model/deployment",
      "apps/workspaces/model/infrastructure"
    ],
    "apps/workspaces/services/infrastructure/infrastructure-manager.js": [
      "apps/workspaces/model/infrastructure"
    ],
    "common/lib/algorithms/graph.js": [
      "./graph/graph",
      "./graph/scheduling",
      "./graph/tarjans"
    ],
    "common/lib/algorithms/graph/scheduling.js": [
      "./graph",
      "lodash"
    ],
    "common/lib/algorithms/graph/tarjans.js": [
      "lodash"
    ],
    "common/lib/canvas.js": [
      "./canvas/core/canvas",
      "./canvas/core/canvas-model",
      "./canvas/events/canvas-events"
    ],
    "common/lib/canvas/actions.js": [
      "./menu/action",
      "./menu/task-cell",
      "./actions/action-service"
    ],
    "common/lib/canvas/actions/action-service.js": [
      "common/lib/utils/uuid"
    ],
    "common/lib/canvas/core/canvas-model.js": [
      "mxgraph"
    ],
    "common/lib/canvas/core/canvas.js": [
      "mxgraph",
      "./grid/grid",
      "./cell-renderer",
      "./menu-selection",
      "./graph-handler",
      "./connection-handler",
      "./canvas-model",
      "./vertex-handler"
    ],
    "common/lib/canvas/core/cell-renderer.js": [
      "mxgraph"
    ],
    "common/lib/canvas/core/connection-handler.js": [
      "mxgraph"
    ],
    "common/lib/canvas/core/graph-handler.js": [
      "mxgraph"
    ],
    "common/lib/canvas/core/grid/grid.js": [
      "mxgraph"
    ],
    "common/lib/canvas/core/menu-selection.js": [
      "mxgraph"
    ],
    "common/lib/canvas/core/selection-handler.js": [
      "mxgraph"
    ],
    "common/lib/canvas/core/vertex-handler.js": [
      "mxgraph"
    ],
    "common/lib/canvas/element.js": [
      "./element/element",
      "./element/events",
      "./element/registry-aware"
    ],
    "common/lib/canvas/element/element.js": [
      "mxgraph",
      "common/lib/utils"
    ],
    "common/lib/canvas/element/events.js": [
      "common/lib/utils"
    ],
    "common/lib/canvas/element/registry-aware.js": [
      "./element"
    ],
    "common/lib/canvas/interchange.js": [
      "./interchange/jsongraph"
    ],
    "common/lib/canvas/menu/action.js": [
      "common/lib/canvas/actions/action-service"
    ],
    "common/lib/canvas/menu/task-cell.js": [
      "mxgraph",
      "common/lib/utils",
      "common/lib/canvas/element"
    ],
    "common/lib/canvas/scene-graph/scene-graph.js": [
      "common/lib/canvas/element"
    ],
    "common/lib/storage.js": [
      "./storage/local",
      "./storage/application-state"
    ],
    "common/lib/storage/application-state.js": [
      "./local",
      "aurelia-framework"
    ],
    "common/lib/storage/local.js": [
      "./local/local-storage"
    ],
    "common/lib/storage/local/local-storage.js": [
      "common/lib/lang"
    ],
    "common/lib/utils.js": [
      "./utils/uuid",
      "./utils/events",
      "./utils/objects",
      "./utils/progress",
      "./utils/observer",
      "./utils/registry"
    ],
    "common/lib/utils/registry.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "aurelia-dependency-injection"
    ],
    "common/lib/widget.js": [
      "./widget/menu"
    ],
    "common/lib/widget/menu.js": [
      "./menu/menu",
      "./menu/components"
    ],
    "common/lib/widget/menu/menu.js": [
      "aurelia-framework",
      "./components"
    ],
    "common/model/api/core.js": [
      "./core/application"
    ],
    "common/model/api/hal.js": [
      "./hal/os",
      "./hal/api",
      "./hal/image"
    ],
    "common/model/api/hal/api.js": [
      "common/lib/utils/uuid"
    ],
    "common/model/api/hal/compute.js": [
      "common/lib/utils"
    ],
    "common/model/api/hal/os.js": [
      "./api",
      "common/lib/utils/uuid"
    ],
    "common/model/security.js": [
      "./security/user",
      "./security/token",
      "./security/credentials"
    ],
    "common/model/security/token.js": [
      "aurelia-framework",
      "common/lib/storage/local/local-storage",
      "aurelia-fetch-client"
    ],
    "common/resources/custom-components/semantic-ui-renderer.js": [
      "aurelia-pal"
    ],
    "common/resources/custom-elements/nav-bar/profile-dropdown.js": [
      "common/model/security",
      "aurelia-framework",
      "aurelia-router",
      "jquery"
    ],
    "common/resources/custom-elements/tree.js": [
      "./tree/node",
      "./tree/tree"
    ],
    "common/resources/custom-elements/tree/node.js": [
      "aurelia-framework",
      "./tree"
    ],
    "common/resources/custom-elements/tree/tree.js": [
      "aurelia-framework",
      "common/lib/utils"
    ],
    "main.js": [
      "aurelia-fetch-client",
      "common/lib/storage/local/local-storage",
      "common/model/security",
      "common/resources/custom-components/semantic-ui-renderer",
      "jquery",
      "fetch"
    ]
  }
});