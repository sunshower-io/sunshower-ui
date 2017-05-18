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
    },
    "ace/*": {
      "deps": "ace"
    }
  },
  map: {
    "ace": "github:ajaxorg/ace-builds@1.2.6",
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.2",
    "aurelia-animator-velocity": "npm:aurelia-animator-velocity@1.1.0",
    "aurelia-binding": "npm:aurelia-binding@1.2.1",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@2.1.1",
    "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.1",
    "aurelia-dialog": "npm:aurelia-dialog@1.0.0-beta.3.0.1",
    "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.1.0",
    "aurelia-framework": "npm:aurelia-framework@1.1.2",
    "aurelia-history": "npm:aurelia-history@1.0.0",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
    "aurelia-http-client": "npm:aurelia-http-client@1.1.1",
    "aurelia-loader": "npm:aurelia-loader@1.0.0",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.2",
    "aurelia-logging": "npm:aurelia-logging@1.3.1",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
    "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
    "aurelia-pal": "npm:aurelia-pal@1.3.0",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.2.1",
    "aurelia-path": "npm:aurelia-path@1.1.1",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.2.1",
    "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.1.0",
    "aurelia-router": "npm:aurelia-router@1.3.0",
    "aurelia-task-queue": "npm:aurelia-task-queue@1.2.0",
    "aurelia-templating": "npm:aurelia-templating@1.4.1",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.3.0",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.4.0",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.1.0",
    "aurelia-validation": "npm:aurelia-validation@1.0.0",
    "bluebird": "npm:bluebird@3.4.1",
    "bootstrap": "github:twbs/bootstrap@3.3.7",
    "buffer": "github:jspm/nodelibs-buffer@0.1.1",
    "canvg": "github:canvg/canvg@master",
    "canvg/canvg": "github:canvg/canvg@master",
    "chart.js": "npm:chart.js@2.5.0",
    "css": "github:systemjs/plugin-css@0.1.33",
    "cytoscape": "npm:cytoscape@2.7.13",
    "cytoscape-edgehandles": "npm:cytoscape-edgehandles@2.7.1",
    "cytoscape-grid-guide": "npm:cytoscape-grid-guide@1.0.4",
    "cytoscape-node-resize": "npm:cytoscape-node-resize@1.0.10",
    "cytoscape-node-resize:n": "npm:cytoscape-node-resize@1.0.10",
    "d3": "npm:d3@3.5.17",
    "d3-geo-projection": "github:d3/d3-geo-projection@1.2.1",
    "d3/d3-geo-projection": "github:d3/d3-geo-projection@1.2.1",
    "datamaps": "github:markmarkoh/datamaps@0.5.8",
    "dmauro/Keypress": "github:dmauro/Keypress@2.1.4",
    "dockerfile-parse": "npm:dockerfile-parse@0.2.0",
    "dockerfile-parser": "github:joyent/node-docker-file-parser@master",
    "dropzone": "github:enyo/dropzone@4.3.0",
    "edge-editiation": "github:frankiex/cytoscape.js-edge-editation@master",
    "element-queries": "github:marcj/css-element-queries@0.3.2",
    "enyo/dropzone": "github:enyo/dropzone@4.3.0",
    "fetch": "github:github/fetch@1.1.1",
    "font-awesome": "npm:font-awesome@4.6.3",
    "joyent/node-docker-file-parser": "github:joyent/node-docker-file-parser@master",
    "jquery": "npm:jquery@2.2.4",
    "keypress": "github:dmauro/Keypress@2.1.4",
    "lodash": "npm:lodash@4.17.4",
    "markmarkoh/datamaps": "github:markmarkoh/datamaps@0.5.8",
    "maskedinput": "github:digitalBush/jquery.maskedinput@1.4.1",
    "materialize-css": "npm:materialize-css@0.98.1",
    "mdi": "npm:mdi@1.9.33",
    "mxgraph": "github:jgraph/mxgraph-js@master",
    "node-docker-file-parser": "github:joyent/node-docker-file-parser@master",
    "ocanvas": "npm:ocanvas@2.8.7",
    "plotly/plotly.js": "github:plotly/plotly.js@1.21.3",
    "plugin-text": "npm:systemjs-plugin-text@0.0.9",
    "pnotify": "github:sciactive/pnotify@3.0.0",
    "pnotify.callbacks": "github:sciactive/pnotify@3.0.0/dist/pnotify.callbacks",
    "rgbcolor": "github:canvg/canvg@master/rgbcolor",
    "rxjs": "npm:rxjs@5.2.0",
    "showdown": "npm:showdown@1.6.4",
    "stackblur": "github:canvg/canvg@master/StackBlur",
    "terminal-js": "npm:terminal-js@1.0.2",
    "text": "github:systemjs/plugin-text@0.0.9",
    "topojson": "github:topojson/topojson@2.2.0",
    "topojson/topojson": "github:topojson/topojson@2.2.0",
    "velocity": "github:julianshapiro/velocity@1.4.1",
    "velocity-ui": "github:julianshapiro/velocity@1.4.1/velocity.ui.js",
    "xterm": "npm:xterm@2.4.0",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.1": {
      "buffer": "npm:buffer@5.0.6"
    },
    "github:jspm/nodelibs-constants@0.1.0": {
      "constants-browserify": "npm:constants-browserify@0.0.1"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.10"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:jspm/nodelibs-zlib@0.1.0": {
      "browserify-zlib": "npm:browserify-zlib@0.1.4"
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
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.2": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-templating": "npm:aurelia-templating@1.4.1"
    },
    "npm:aurelia-animator-velocity@1.1.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-templating": "npm:aurelia-templating@1.4.1",
      "velocity-animate": "npm:velocity-animate@1.5.0"
    },
    "npm:aurelia-binding@1.2.1": {
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.2.0"
    },
    "npm:aurelia-bootstrapper@2.1.1": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-framework": "npm:aurelia-framework@1.1.2",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.2",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.2.1",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.2.1",
      "aurelia-router": "npm:aurelia-router@1.3.0",
      "aurelia-templating": "npm:aurelia-templating@1.4.1",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.3.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.4.0",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.1.0"
    },
    "npm:aurelia-dependency-injection@1.3.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
    },
    "npm:aurelia-dialog@1.0.0-beta.3.0.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-templating": "npm:aurelia-templating@1.4.1"
    },
    "npm:aurelia-event-aggregator@1.0.1": {
      "aurelia-logging": "npm:aurelia-logging@1.3.1"
    },
    "npm:aurelia-framework@1.1.2": {
      "aurelia-binding": "npm:aurelia-binding@1.2.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.4.1"
    },
    "npm:aurelia-history-browser@1.0.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
    },
    "npm:aurelia-http-client@1.1.1": {
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-loader-default@1.0.2": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
    },
    "npm:aurelia-loader@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-logging-console@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.3.1"
    },
    "npm:aurelia-metadata@1.0.3": {
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
    },
    "npm:aurelia-pal-browser@1.2.1": {
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
    },
    "npm:aurelia-polyfills@1.2.1": {
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
    },
    "npm:aurelia-route-recognizer@1.1.0": {
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-router@1.3.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.1",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.1.0"
    },
    "npm:aurelia-task-queue@1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
    },
    "npm:aurelia-templating-binding@1.3.0": {
      "aurelia-binding": "npm:aurelia-binding@1.2.1",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-templating": "npm:aurelia-templating@1.4.1"
    },
    "npm:aurelia-templating-resources@1.4.0": {
      "aurelia-binding": "npm:aurelia-binding@1.2.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.4.1"
    },
    "npm:aurelia-templating-router@1.1.0": {
      "aurelia-binding": "npm:aurelia-binding@1.2.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.1",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.3.0",
      "aurelia-templating": "npm:aurelia-templating@1.4.1"
    },
    "npm:aurelia-templating@1.4.1": {
      "aurelia-binding": "npm:aurelia-binding@1.2.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.2.0"
    },
    "npm:aurelia-validation@1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.2.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.1",
      "aurelia-logging": "npm:aurelia-logging@1.3.1",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.4.1"
    },
    "npm:block-stream@0.0.9": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:bluebird@3.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:brace-expansion@1.1.7": {
      "balanced-match": "npm:balanced-match@0.4.2",
      "concat-map": "npm:concat-map@0.0.1"
    },
    "npm:browserify-zlib@0.1.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "pako": "npm:pako@0.2.9",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "readable-stream": "npm:readable-stream@2.2.9",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:buffer-shims@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:buffer@5.0.6": {
      "base64-js": "npm:base64-js@1.2.0",
      "ieee754": "npm:ieee754@1.1.8"
    },
    "npm:builtin-modules@1.1.1": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:chart.js@2.5.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "chartjs-color": "npm:chartjs-color@2.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "moment": "npm:moment@2.17.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:chartjs-color-string@0.4.0": {
      "color-name": "npm:color-name@1.1.1"
    },
    "npm:chartjs-color@2.1.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "chartjs-color-string": "npm:chartjs-color-string@0.4.0",
      "color-convert": "npm:color-convert@0.5.3"
    },
    "npm:cliui@3.2.0": {
      "string-width": "npm:string-width@1.0.2",
      "strip-ansi": "npm:strip-ansi@3.0.1",
      "wrap-ansi": "npm:wrap-ansi@2.1.0"
    },
    "npm:constants-browserify@0.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
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
    "npm:error-ex@1.3.0": {
      "is-arrayish": "npm:is-arrayish@0.2.1",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:find-up@1.1.2": {
      "path": "github:jspm/nodelibs-path@0.1.0",
      "path-exists": "npm:path-exists@2.1.0",
      "pinkie-promise": "npm:pinkie-promise@2.0.1"
    },
    "npm:font-awesome@4.6.3": {
      "css": "github:systemjs/plugin-css@0.1.33"
    },
    "npm:fs.realpath@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:fstream@1.0.11": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "graceful-fs": "npm:graceful-fs@4.1.11",
      "inherits": "npm:inherits@2.0.1",
      "mkdirp": "npm:mkdirp@0.5.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "rimraf": "npm:rimraf@2.6.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:glob@7.1.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "fs.realpath": "npm:fs.realpath@1.0.0",
      "inflight": "npm:inflight@1.0.6",
      "inherits": "npm:inherits@2.0.1",
      "minimatch": "npm:minimatch@3.0.3",
      "once": "npm:once@1.4.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "path-is-absolute": "npm:path-is-absolute@1.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:graceful-fs@4.1.11": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:hammerjs@2.0.8": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:hosted-git-info@2.2.0": {
      "url": "github:jspm/nodelibs-url@0.1.0"
    },
    "npm:inflight@1.0.6": {
      "once": "npm:once@1.4.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "wrappy": "npm:wrappy@1.0.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:is-builtin-module@1.0.0": {
      "builtin-modules": "npm:builtin-modules@1.1.1"
    },
    "npm:is-fullwidth-code-point@1.0.0": {
      "number-is-nan": "npm:number-is-nan@1.0.1"
    },
    "npm:lcid@1.0.0": {
      "invert-kv": "npm:invert-kv@1.0.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:load-json-file@1.1.0": {
      "graceful-fs": "npm:graceful-fs@4.1.11",
      "parse-json": "npm:parse-json@2.2.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "pify": "npm:pify@2.3.0",
      "pinkie-promise": "npm:pinkie-promise@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "strip-bom": "npm:strip-bom@2.0.0"
    },
    "npm:materialize-css@0.98.1": {
      "hammerjs": "npm:hammerjs@2.0.8",
      "jquery": "npm:jquery@2.2.4",
      "node-archiver": "npm:node-archiver@0.3.0"
    },
    "npm:minimatch@3.0.3": {
      "brace-expansion": "npm:brace-expansion@1.1.7",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:mkdirp@0.5.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "minimist": "npm:minimist@0.0.8",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:node-archiver@0.3.0": {
      "fstream": "npm:fstream@1.0.11",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "tar": "npm:tar@2.2.1",
      "zlib": "github:jspm/nodelibs-zlib@0.1.0"
    },
    "npm:normalize-package-data@2.3.5": {
      "hosted-git-info": "npm:hosted-git-info@2.2.0",
      "is-builtin-module": "npm:is-builtin-module@1.0.0",
      "semver": "npm:semver@5.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "validate-npm-package-license": "npm:validate-npm-package-license@3.0.1"
    },
    "npm:ocanvas@2.8.7": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:once@1.4.0": {
      "wrappy": "npm:wrappy@1.0.2"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:os-locale@1.4.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "lcid": "npm:lcid@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:pako@0.2.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:parse-json@2.2.0": {
      "error-ex": "npm:error-ex@1.3.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-exists@2.1.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "pinkie-promise": "npm:pinkie-promise@2.0.1"
    },
    "npm:path-is-absolute@1.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-type@1.1.0": {
      "graceful-fs": "npm:graceful-fs@4.1.11",
      "pify": "npm:pify@2.3.0",
      "pinkie-promise": "npm:pinkie-promise@2.0.1"
    },
    "npm:pify@2.3.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:pinkie-promise@2.0.1": {
      "pinkie": "npm:pinkie@2.0.4"
    },
    "npm:process-nextick-args@1.0.7": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.10": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:read-pkg-up@1.0.1": {
      "find-up": "npm:find-up@1.1.2",
      "read-pkg": "npm:read-pkg@1.1.0"
    },
    "npm:read-pkg@1.1.0": {
      "load-json-file": "npm:load-json-file@1.1.0",
      "normalize-package-data": "npm:normalize-package-data@2.3.5",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "path-type": "npm:path-type@1.1.0"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:readable-stream@2.2.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "buffer-shims": "npm:buffer-shims@1.0.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "process-nextick-args": "npm:process-nextick-args@1.0.7",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "npm:string_decoder@1.0.0",
      "util-deprecate": "npm:util-deprecate@1.0.2"
    },
    "npm:require-directory@2.1.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:require-main-filename@1.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:rimraf@2.6.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "glob": "npm:glob@7.1.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:rxjs@5.2.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "symbol-observable": "npm:symbol-observable@1.0.4"
    },
    "npm:semver@5.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:set-blocking@2.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:showdown@1.6.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "yargs": "npm:yargs@6.6.0"
    },
    "npm:spdx-correct@1.0.2": {
      "spdx-license-ids": "npm:spdx-license-ids@1.2.2"
    },
    "npm:spdx-expression-parse@1.0.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:spdx-license-ids@1.2.2": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string-width@1.0.2": {
      "code-point-at": "npm:code-point-at@1.1.0",
      "is-fullwidth-code-point": "npm:is-fullwidth-code-point@1.0.0",
      "strip-ansi": "npm:strip-ansi@3.0.1"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:string_decoder@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "buffer-shims": "npm:buffer-shims@1.0.0"
    },
    "npm:strip-ansi@3.0.1": {
      "ansi-regex": "npm:ansi-regex@2.1.1"
    },
    "npm:strip-bom@2.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "is-utf8": "npm:is-utf8@0.2.1"
    },
    "npm:tar@2.2.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "block-stream": "npm:block-stream@0.0.9",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "fstream": "npm:fstream@1.0.11",
      "inherits": "npm:inherits@2.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:terminal-js@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "lodash": "npm:lodash@4.17.4",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util-deprecate@1.0.2": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:validate-npm-package-license@3.0.1": {
      "spdx-correct": "npm:spdx-correct@1.0.2",
      "spdx-expression-parse": "npm:spdx-expression-parse@1.0.4"
    },
    "npm:velocity-animate@1.5.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:wrap-ansi@2.1.0": {
      "string-width": "npm:string-width@1.0.2",
      "strip-ansi": "npm:strip-ansi@3.0.1"
    },
    "npm:xterm@2.4.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:y18n@3.2.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:yargs-parser@4.2.1": {
      "camelcase": "npm:camelcase@3.0.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:yargs@6.6.0": {
      "camelcase": "npm:camelcase@3.0.0",
      "cliui": "npm:cliui@3.2.0",
      "decamelize": "npm:decamelize@1.2.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "get-caller-file": "npm:get-caller-file@1.0.2",
      "os-locale": "npm:os-locale@1.4.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "read-pkg-up": "npm:read-pkg-up@1.0.1",
      "require-directory": "npm:require-directory@2.1.1",
      "require-main-filename": "npm:require-main-filename@1.0.1",
      "set-blocking": "npm:set-blocking@2.0.0",
      "string-width": "npm:string-width@1.0.2",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "which-module": "npm:which-module@1.0.0",
      "y18n": "npm:y18n@3.2.1",
      "yargs-parser": "npm:yargs-parser@4.2.1"
    }
  },
  bundles: {
    "aurelia.js": [
      "github:github/fetch@1.1.1.js",
      "github:github/fetch@1.1.1/fetch.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "npm:aurelia-animator-css@1.0.2.js",
      "npm:aurelia-animator-css@1.0.2/aurelia-animator-css.js",
      "npm:aurelia-animator-velocity@1.1.0.js",
      "npm:aurelia-animator-velocity@1.1.0/aurelia-animator-velocity.js",
      "npm:aurelia-binding@1.2.1.js",
      "npm:aurelia-binding@1.2.1/aurelia-binding.js",
      "npm:aurelia-bootstrapper@2.1.1.js",
      "npm:aurelia-bootstrapper@2.1.1/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.3.1.js",
      "npm:aurelia-dependency-injection@1.3.1/aurelia-dependency-injection.js",
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
      "npm:aurelia-framework@1.1.2.js",
      "npm:aurelia-framework@1.1.2/aurelia-framework.js",
      "npm:aurelia-history-browser@1.0.0.js",
      "npm:aurelia-history-browser@1.0.0/aurelia-history-browser.js",
      "npm:aurelia-history@1.0.0.js",
      "npm:aurelia-history@1.0.0/aurelia-history.js",
      "npm:aurelia-http-client@1.1.1.js",
      "npm:aurelia-http-client@1.1.1/aurelia-http-client.js",
      "npm:aurelia-loader-default@1.0.2.js",
      "npm:aurelia-loader-default@1.0.2/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0.js",
      "npm:aurelia-loader@1.0.0/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0.js",
      "npm:aurelia-logging-console@1.0.0/aurelia-logging-console.js",
      "npm:aurelia-logging@1.3.1.js",
      "npm:aurelia-logging@1.3.1/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.3.js",
      "npm:aurelia-metadata@1.0.3/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.2.1.js",
      "npm:aurelia-pal-browser@1.2.1/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.3.0.js",
      "npm:aurelia-pal@1.3.0/aurelia-pal.js",
      "npm:aurelia-path@1.1.1.js",
      "npm:aurelia-path@1.1.1/aurelia-path.js",
      "npm:aurelia-polyfills@1.2.1.js",
      "npm:aurelia-polyfills@1.2.1/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.1.0.js",
      "npm:aurelia-route-recognizer@1.1.0/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.3.0.js",
      "npm:aurelia-router@1.3.0/aurelia-router.js",
      "npm:aurelia-task-queue@1.2.0.js",
      "npm:aurelia-task-queue@1.2.0/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.3.0.js",
      "npm:aurelia-templating-binding@1.3.0/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.4.0.js",
      "npm:aurelia-templating-resources@1.4.0/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.4.0/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.4.0/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.4.0/attr-binding-behavior.js",
      "npm:aurelia-templating-resources@1.4.0/aurelia-hide-style.js",
      "npm:aurelia-templating-resources@1.4.0/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.4.0/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.4.0/binding-signaler.js",
      "npm:aurelia-templating-resources@1.4.0/compose.js",
      "npm:aurelia-templating-resources@1.4.0/css-resource.js",
      "npm:aurelia-templating-resources@1.4.0/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.4.0/dynamic-element.js",
      "npm:aurelia-templating-resources@1.4.0/focus.js",
      "npm:aurelia-templating-resources@1.4.0/hide.js",
      "npm:aurelia-templating-resources@1.4.0/html-resource-plugin.js",
      "npm:aurelia-templating-resources@1.4.0/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.4.0/if.js",
      "npm:aurelia-templating-resources@1.4.0/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.4.0/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.4.0/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.4.0/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.4.0/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.4.0/repeat.js",
      "npm:aurelia-templating-resources@1.4.0/replaceable.js",
      "npm:aurelia-templating-resources@1.4.0/sanitize-html.js",
      "npm:aurelia-templating-resources@1.4.0/self-binding-behavior.js",
      "npm:aurelia-templating-resources@1.4.0/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.4.0/show.js",
      "npm:aurelia-templating-resources@1.4.0/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.4.0/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.4.0/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.4.0/with.js",
      "npm:aurelia-templating-router@1.1.0.js",
      "npm:aurelia-templating-router@1.1.0/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.1.0/route-href.js",
      "npm:aurelia-templating-router@1.1.0/route-loader.js",
      "npm:aurelia-templating-router@1.1.0/router-view.js",
      "npm:aurelia-templating@1.4.1.js",
      "npm:aurelia-templating@1.4.1/aurelia-templating.js",
      "npm:aurelia-validation@1.0.0.js",
      "npm:aurelia-validation@1.0.0/aurelia-validation.js",
      "npm:aurelia-validation@1.0.0/get-target-dom-element.js",
      "npm:aurelia-validation@1.0.0/implementation/rules.js",
      "npm:aurelia-validation@1.0.0/implementation/standard-validator.js",
      "npm:aurelia-validation@1.0.0/implementation/util.js",
      "npm:aurelia-validation@1.0.0/implementation/validation-messages.js",
      "npm:aurelia-validation@1.0.0/implementation/validation-parser.js",
      "npm:aurelia-validation@1.0.0/implementation/validation-rules.js",
      "npm:aurelia-validation@1.0.0/property-info.js",
      "npm:aurelia-validation@1.0.0/validate-binding-behavior-base.js",
      "npm:aurelia-validation@1.0.0/validate-binding-behavior.js",
      "npm:aurelia-validation@1.0.0/validate-result.js",
      "npm:aurelia-validation@1.0.0/validate-trigger.js",
      "npm:aurelia-validation@1.0.0/validation-controller-factory.js",
      "npm:aurelia-validation@1.0.0/validation-controller.js",
      "npm:aurelia-validation@1.0.0/validation-errors-custom-attribute.js",
      "npm:aurelia-validation@1.0.0/validation-renderer-custom-attribute.js",
      "npm:aurelia-validation@1.0.0/validator.js",
      "npm:jquery@2.2.4.js",
      "npm:jquery@2.2.4/dist/jquery.js",
      "npm:process@0.11.10.js",
      "npm:process@0.11.10/browser.js",
      "npm:velocity-animate@1.5.0.js",
      "npm:velocity-animate@1.5.0/velocity.js",
      "npm:velocity-animate@1.5.0/velocity.ui.js"
    ],
    "app-build.js": [
      "app.html!github:systemjs/plugin-text@0.0.9.js",
      "app.js",
      "apps/404/index.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/404/index.js",
      "apps/admin/approvals/approvals.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/admin/approvals/approvals.js",
      "apps/auth/auth.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/auth.js",
      "apps/auth/login/login.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/login/login.js",
      "apps/auth/signup/signup.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/signup/signup.js",
      "apps/workspaces/index.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/index.js",
      "apps/workspaces/lib/model/core/workspace.js",
      "apps/workspaces/lib/model/core/workspace/model.js",
      "apps/workspaces/lib/model/core/workspace/service.js",
      "apps/workspaces/lib/palette/core/element.js",
      "apps/workspaces/lib/palette/infrastructure/compute-node-template.js",
      "apps/workspaces/lib/palette/infrastructure/infrastructure-palette.js",
      "apps/workspaces/lib/palette/infrastructure/security-group.js",
      "apps/workspaces/lib/palette/orchestration/templates/docker/docker-nodes.js",
      "apps/workspaces/lib/palette/orchestration/templates/docker/docker-orchestration-template.js",
      "apps/workspaces/lib/palette/orchestration/templates/hasli/hasli-orchestration-template.js",
      "apps/workspaces/lib/palette/orchestration/templates/kubernetes/kubernetes-orchestration-template.js",
      "apps/workspaces/lib/palette/orchestration/templates/nomad/nomad-orchestration-template.js",
      "apps/workspaces/lib/palette/orchestration/templates/provider-factory.js",
      "apps/workspaces/lib/palette/security/security-group.js",
      "apps/workspaces/resources/custom-elements/events.js",
      "apps/workspaces/resources/custom-elements/navigator.js",
      "apps/workspaces/resources/custom-elements/navigator/navigator.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/navigator/navigator.js",
      "apps/workspaces/resources/custom-elements/workspace-card/workspace-card.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/workspace-card/workspace-card.js",
      "apps/workspaces/routes/workspace/applications/context-menu.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/context-menu.js",
      "apps/workspaces/routes/workspace/applications/index.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/index.js",
      "apps/workspaces/routes/workspace/create/create.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/create/create.js",
      "apps/workspaces/routes/workspace/dashboard/context-menu.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/dashboard/context-menu.js",
      "apps/workspaces/routes/workspace/dashboard/dashboard/dashboard.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/dashboard/dashboard/dashboard.js",
      "apps/workspaces/routes/workspace/dashboard/index.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/dashboard/index.js",
      "apps/workspaces/routes/workspace/dashboard/instances/instances.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/dashboard/instances/instances.js",
      "apps/workspaces/routes/workspace/index.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/index.js",
      "apps/workspaces/routes/workspace/infrastructure/context-menu.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/context-menu.js",
      "apps/workspaces/routes/workspace/infrastructure/designer/infrastructure-designer.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/designer/infrastructure-designer.js",
      "apps/workspaces/routes/workspace/infrastructure/index.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/index.js",
      "apps/workspaces/routes/workspaces.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspaces.js",
      "css/styles.min.css!github:systemjs/plugin-text@0.0.9.js",
      "lib/common/algorithms/graph.js",
      "lib/common/algorithms/graph/graph.js",
      "lib/common/algorithms/graph/scheduling.js",
      "lib/common/algorithms/graph/tarjans.js",
      "lib/common/edit/command.js",
      "lib/common/edit/command/command.js",
      "lib/common/lang.js",
      "lib/common/lang/enum.js",
      "lib/common/lang/identifier.js",
      "lib/common/lang/uuid.js",
      "lib/common/math.js",
      "lib/common/pipeline.js",
      "lib/common/resources/custom-attributes/roles-allowed.js",
      "lib/common/resources/custom-elements/body-panel/body-panel.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/common/resources/custom-elements/body-panel/body-panel.js",
      "lib/common/resources/custom-elements/materialize-renderer.js",
      "lib/common/resources/custom-elements/nav-bar/breadcrumb.js",
      "lib/common/resources/custom-elements/nav-bar/navbar.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/common/resources/custom-elements/nav-bar/navbar.js",
      "lib/common/resources/custom-elements/summary-icon/summary-icon.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/common/resources/custom-elements/summary-icon/summary-icon.js",
      "lib/common/security.js",
      "lib/common/security/model.js",
      "lib/common/security/model/token.js",
      "lib/common/security/model/user.js",
      "lib/common/security/service/signup.js",
      "lib/common/service.js",
      "lib/common/service/context-resolver.js",
      "lib/common/service/service-manager.js",
      "lib/common/service/service.js",
      "lib/common/storage.js",
      "lib/common/storage/application-state.js",
      "lib/common/storage/local.js",
      "lib/common/storage/local/local-storage.js",
      "lib/common/util.js",
      "lib/common/util/stack.js",
      "lib/designer/canvas.js",
      "lib/designer/canvas/action.js",
      "lib/designer/canvas/actions/delete-action.js",
      "lib/designer/canvas/actions/redo-action.js",
      "lib/designer/canvas/actions/undo-action.js",
      "lib/designer/canvas/canvas.js",
      "lib/designer/canvas/chord.js",
      "lib/designer/canvas/key-handler.js",
      "lib/designer/canvas/palette.js",
      "lib/designer/core.js",
      "lib/designer/core/designer-manager.js",
      "lib/designer/core/designer.js",
      "lib/designer/core/grid.js",
      "lib/designer/core/selector.js",
      "lib/designer/elements.js",
      "lib/designer/elements/designer/abstract-panel.js",
      "lib/designer/elements/designer/action-button.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/designer/elements/designer/action-button.js",
      "lib/designer/elements/designer/designer-element.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/designer/elements/designer/designer-element.js",
      "lib/designer/elements/designer/left-panel.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/designer/elements/designer/left-panel.js",
      "lib/designer/elements/designer/right-panel.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/designer/elements/designer/right-panel.js",
      "lib/designer/elements/element-panel/element-panel.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/designer/elements/element-panel/element-panel.js",
      "lib/designer/elements/element-panel/palette-icon.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/designer/elements/element-panel/palette-icon.js",
      "lib/designer/elements/layer-panel/layer-panel.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/designer/elements/layer-panel/layer-panel.js",
      "lib/designer/elements/menu-bar/menu-bar.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/designer/elements/menu-bar/menu-bar.js",
      "lib/designer/elements/panel.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/designer/elements/panel.js",
      "lib/designer/elements/panels.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/designer/elements/panels.js",
      "lib/designer/elements/property-panel/property-panel.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/designer/elements/property-panel/property-panel.js",
      "lib/designer/elements/views/left-view.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/designer/elements/views/left-view.js",
      "lib/designer/elements/views/right-view.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/designer/elements/views/right-view.js",
      "lib/designer/elements/views/view.js",
      "lib/designer/model.js",
      "lib/designer/model/elements.js",
      "lib/designer/model/model.js",
      "lib/designer/model/overlays.js",
      "lib/hal/core.js",
      "lib/hal/infrastructure/compute.js",
      "lib/hal/infrastructure/compute/infrastructure-node-template.js",
      "lib/hal/infrastructure/security.js",
      "lib/hal/infrastructure/security/security-group.js",
      "lib/resources/custom-elements/loader/loader.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/resources/custom-elements/loader/loader.js",
      "lib/resources/custom-elements/misc/bottom-element.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/resources/custom-elements/misc/bottom-element.js",
      "lib/resources/custom-elements/misc/full-element.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/resources/custom-elements/misc/full-element.js",
      "lib/resources/custom-elements/misc/top-element.html!github:systemjs/plugin-text@0.0.9.js",
      "lib/resources/custom-elements/misc/top-element.js",
      "main.js"
    ]
  },
  depCache: {
    "app.js": [
      "aurelia-framework",
      "aurelia-router",
      "lib/common/security",
      "aurelia-templating",
      "aurelia-dependency-injection",
      "lib/common/pipeline",
      "lib/common/storage/application-state",
      "aurelia-binding",
      "./apps/workspaces/resources/custom-elements/navigator",
      "jquery"
    ],
    "apps/404/index.js": [
      "aurelia-dependency-injection"
    ],
    "apps/admin/approvals/approvals.js": [
      "aurelia-framework",
      "lib/common/security/service/signup"
    ],
    "apps/auth/auth.js": [
      "aurelia-framework",
      "aurelia-dependency-injection",
      "jquery"
    ],
    "apps/auth/login/login.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "aurelia-dependency-injection",
      "lib/common/security",
      "lib/common/storage",
      "apps/auth/auth",
      "aurelia-router",
      "lib/common/lang"
    ],
    "apps/auth/signup/signup.js": [
      "lib/common/lang",
      "aurelia-router",
      "aurelia-framework",
      "lib/common/security/service/signup",
      "lib/common/security/model/user"
    ],
    "apps/workspaces/index.js": [
      "aurelia-framework",
      "materialize-css",
      "apps/workspaces/resources/custom-elements/navigator"
    ],
    "apps/workspaces/lib/model/core/workspace.js": [
      "./workspace/model",
      "./workspace/service"
    ],
    "apps/workspaces/lib/model/core/workspace/service.js": [
      "aurelia-http-client",
      "aurelia-fetch-client",
      "./model",
      "aurelia-framework",
      "lib/common/service",
      "lib/common/lang/identifier",
      "rxjs/Subject"
    ],
    "apps/workspaces/lib/palette/infrastructure/compute-node-template.js": [
      "lib/designer/canvas/palette",
      "lib/designer/model",
      "mxgraph"
    ],
    "apps/workspaces/lib/palette/infrastructure/infrastructure-palette.js": [
      "./compute-node-template",
      "./security-group"
    ],
    "apps/workspaces/lib/palette/infrastructure/security-group.js": [
      "lib/designer/canvas/palette",
      "lib/designer/model",
      "mxgraph"
    ],
    "apps/workspaces/lib/palette/orchestration/templates/docker/docker-nodes.js": [
      "lib/designer/model"
    ],
    "apps/workspaces/lib/palette/orchestration/templates/docker/docker-orchestration-template.js": [
      "lib/designer/canvas/palette",
      "lib/designer/model",
      "mxgraph",
      "./docker-nodes",
      "lib/common/security/model/user"
    ],
    "apps/workspaces/lib/palette/orchestration/templates/hasli/hasli-orchestration-template.js": [
      "lib/designer/canvas/palette",
      "lib/designer/model",
      "mxgraph",
      "lib/common/security/model/user"
    ],
    "apps/workspaces/lib/palette/orchestration/templates/kubernetes/kubernetes-orchestration-template.js": [
      "lib/designer/canvas/palette",
      "lib/designer/model",
      "mxgraph",
      "lib/common/security/model/user"
    ],
    "apps/workspaces/lib/palette/orchestration/templates/nomad/nomad-orchestration-template.js": [
      "lib/designer/canvas/palette",
      "lib/designer/model",
      "mxgraph",
      "lib/common/security/model/user"
    ],
    "apps/workspaces/lib/palette/orchestration/templates/provider-factory.js": [
      "./hasli/hasli-orchestration-template",
      "./nomad/nomad-orchestration-template",
      "./kubernetes/kubernetes-orchestration-template",
      "./docker/docker-orchestration-template"
    ],
    "apps/workspaces/resources/custom-elements/navigator.js": [
      "aurelia-framework",
      "aurelia-router",
      "aurelia-binding",
      "lib/common/storage/application-state"
    ],
    "apps/workspaces/resources/custom-elements/navigator/navigator.js": [
      "aurelia-framework",
      "apps/workspaces/resources/custom-elements/navigator",
      "aurelia-animator-velocity",
      "lib/common/storage/application-state",
      "aurelia-event-aggregator",
      "../events",
      "materialize-css",
      "mdi/css/materialdesignicons.css!"
    ],
    "apps/workspaces/resources/custom-elements/workspace-card/workspace-card.js": [
      "aurelia-framework",
      "apps/workspaces/lib/model/core/workspace",
      "aurelia-router",
      "aurelia-event-aggregator",
      "../events"
    ],
    "apps/workspaces/routes/workspace/applications/index.js": [
      "aurelia-framework"
    ],
    "apps/workspaces/routes/workspace/create/create.js": [
      "lib/common/lang/uuid",
      "aurelia-framework",
      "apps/workspaces/lib/model/core/workspace",
      "aurelia-dialog",
      "apps/workspaces/lib/model/core/workspace/model",
      "aurelia-router"
    ],
    "apps/workspaces/routes/workspace/dashboard/dashboard/dashboard.js": [
      "aurelia-framework",
      "lib/common/lang/uuid",
      "apps/workspaces/lib/model/core/workspace",
      "plotly/plotly.js"
    ],
    "apps/workspaces/routes/workspace/dashboard/index.js": [
      "aurelia-framework",
      "apps/workspaces/lib/model/core/workspace",
      "apps/workspaces/resources/custom-elements/navigator"
    ],
    "apps/workspaces/routes/workspace/dashboard/instances/instances.js": [
      "aurelia-framework",
      "apps/workspaces/lib/model/core/workspace",
      "apps/workspaces/resources/custom-elements/navigator"
    ],
    "apps/workspaces/routes/workspace/index.js": [
      "aurelia-framework",
      "aurelia-router",
      "apps/workspaces/lib/model/core/workspace/service"
    ],
    "apps/workspaces/routes/workspace/infrastructure/designer/infrastructure-designer.js": [
      "aurelia-framework",
      "apps/workspaces/lib/palette/orchestration/templates/provider-factory"
    ],
    "apps/workspaces/routes/workspaces.js": [
      "aurelia-framework",
      "apps/workspaces/lib/model/core/workspace",
      "aurelia-router",
      "aurelia-dialog",
      "./workspace/create/create",
      "aurelia-event-aggregator",
      "../resources/custom-elements/events"
    ],
    "lib/common/algorithms/graph.js": [
      "./graph/graph",
      "./graph/scheduling",
      "./graph/tarjans"
    ],
    "lib/common/algorithms/graph/scheduling.js": [
      "./graph",
      "lodash"
    ],
    "lib/common/algorithms/graph/tarjans.js": [
      "lodash"
    ],
    "lib/common/edit/command.js": [
      "./command/command"
    ],
    "lib/common/lang.js": [
      "./lang/uuid",
      "./lang/enum",
      "./lang/identifier"
    ],
    "lib/common/pipeline.js": [
      "./service/context-resolver"
    ],
    "lib/common/resources/custom-attributes/roles-allowed.js": [
      "aurelia-framework",
      "lib/common/security/model"
    ],
    "lib/common/resources/custom-elements/body-panel/body-panel.js": [
      "aurelia-framework"
    ],
    "lib/common/resources/custom-elements/materialize-renderer.js": [
      "aurelia-pal"
    ],
    "lib/common/resources/custom-elements/nav-bar/navbar.js": [
      "lib/common/security",
      "aurelia-event-aggregator",
      "aurelia-framework",
      "aurelia-animator-velocity",
      "aurelia-router",
      "lib/common/lang",
      "apps/workspaces/resources/custom-elements/events",
      "apps/workspaces/resources/custom-elements/navigator",
      "./breadcrumb",
      "jquery"
    ],
    "lib/common/resources/custom-elements/summary-icon/summary-icon.js": [
      "aurelia-framework"
    ],
    "lib/common/security.js": [
      "./security/model"
    ],
    "lib/common/security/model.js": [
      "./model/token",
      "./model/user"
    ],
    "lib/common/security/model/token.js": [
      "aurelia-framework",
      "lib/common/storage",
      "./user",
      "aurelia-fetch-client"
    ],
    "lib/common/security/model/user.js": [
      "./token"
    ],
    "lib/common/security/service/signup.js": [
      "aurelia-fetch-client",
      "aurelia-framework",
      "lib/common/service",
      "lib/common/security/model/user"
    ],
    "lib/common/service.js": [
      "./service/service-manager",
      "./service/service"
    ],
    "lib/common/service/context-resolver.js": [
      "./service-manager",
      "../storage/application-state"
    ],
    "lib/common/service/service-manager.js": [
      "lodash"
    ],
    "lib/common/storage.js": [
      "./storage/local",
      "./storage/application-state",
      "./storage/local/local-storage"
    ],
    "lib/common/storage/application-state.js": [
      "./local",
      "aurelia-framework"
    ],
    "lib/common/storage/local.js": [
      "./local/local-storage"
    ],
    "lib/common/util.js": [
      "./util/stack"
    ],
    "lib/designer/canvas.js": [
      "./canvas/canvas"
    ],
    "lib/designer/canvas/canvas.js": [
      "mxgraph",
      "./key-handler"
    ],
    "lib/designer/canvas/key-handler.js": [
      "keypress"
    ],
    "lib/designer/canvas/palette.js": [
      "mxgraph",
      "velocity-ui"
    ],
    "lib/designer/core.js": [
      "./core/grid",
      "./core/selector",
      "./core/designer",
      "./core/designer-manager"
    ],
    "lib/designer/core/designer-manager.js": [
      "aurelia-framework"
    ],
    "lib/designer/core/designer.js": [
      "lib/designer/canvas",
      "lib/designer/model",
      "./selector",
      "../canvas/actions/delete-action",
      "../canvas/actions/undo-action",
      "../canvas/actions/redo-action"
    ],
    "lib/designer/core/grid.js": [
      "mxgraph"
    ],
    "lib/designer/core/selector.js": [
      "mxgraph"
    ],
    "lib/designer/elements.js": [
      "./model/elements"
    ],
    "lib/designer/elements/designer/action-button.js": [
      "aurelia-framework"
    ],
    "lib/designer/elements/designer/designer-element.js": [
      "aurelia-framework",
      "lib/designer/core"
    ],
    "lib/designer/elements/designer/left-panel.js": [
      "aurelia-framework",
      "./abstract-panel"
    ],
    "lib/designer/elements/designer/right-panel.js": [
      "aurelia-framework"
    ],
    "lib/designer/elements/element-panel/element-panel.js": [
      "aurelia-framework",
      "lib/designer/core"
    ],
    "lib/designer/elements/element-panel/palette-icon.js": [
      "aurelia-framework",
      "aurelia-templating",
      "lib/designer/canvas/canvas",
      "lib/common/security/model/token"
    ],
    "lib/designer/elements/layer-panel/layer-panel.js": [
      "aurelia-framework"
    ],
    "lib/designer/elements/menu-bar/menu-bar.js": [
      "aurelia-framework",
      "lib/common/lang",
      "lib/designer/core"
    ],
    "lib/designer/elements/panel.js": [
      "aurelia-framework",
      "lib/common/lang",
      "aurelia-templating-resources"
    ],
    "lib/designer/elements/panels.js": [
      "aurelia-framework"
    ],
    "lib/designer/elements/property-panel/property-panel.js": [
      "aurelia-framework"
    ],
    "lib/designer/model.js": [
      "./model/model",
      "./model/elements"
    ],
    "lib/designer/model/elements.js": [
      "mxgraph",
      "lib/common/lang"
    ],
    "lib/designer/model/model.js": [
      "mxgraph"
    ],
    "lib/designer/model/overlays.js": [
      "mxgraph",
      "lib/common/lang"
    ],
    "lib/resources/custom-elements/loader/loader.js": [
      "aurelia-templating"
    ],
    "lib/resources/custom-elements/misc/bottom-element.js": [
      "aurelia-framework"
    ],
    "lib/resources/custom-elements/misc/full-element.js": [
      "aurelia-framework"
    ],
    "lib/resources/custom-elements/misc/top-element.js": [
      "aurelia-framework"
    ],
    "main.js": [
      "aurelia-fetch-client",
      "aurelia-http-client",
      "lib/common/storage",
      "lib/common/security",
      "./lib/common/resources/custom-elements/materialize-renderer",
      "jquery",
      "fetch",
      "materialize-css"
    ]
  }
});