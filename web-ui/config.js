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
      "process": "npm:process@0.11.9"
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
    "npm:process@0.11.9": {
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
      "npm:process@0.11.9.js",
      "npm:process@0.11.9/browser.js",
      "npm:velocity-animate@1.5.0.js",
      "npm:velocity-animate@1.5.0/velocity.js",
      "npm:velocity-animate@1.5.0/velocity.ui.js"
    ],
    "app-build.js": [
      "app.html!github:systemjs/plugin-text@0.0.9.js",
      "app.js",
      "apps/admin/admin.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/admin/admin.js",
      "apps/auth/auth.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/auth.js",
      "apps/auth/login/login.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/login/login.js",
      "apps/auth/signup/signup.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/signup/signup.js",
      "apps/catalog/index.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/index.js",
      "apps/catalog/routes/categories/apps/containers.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/apps/containers.js",
      "apps/catalog/routes/categories/apps/custom.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/apps/custom.js",
      "apps/catalog/routes/categories/categories.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/categories.js",
      "apps/catalog/routes/categories/infrastructure/compute.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/infrastructure/compute.js",
      "apps/catalog/routes/categories/infrastructure/network.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/infrastructure/network.js",
      "apps/catalog/routes/categories/infrastructure/storage.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/infrastructure/storage.js",
      "apps/catalog/routes/categories/services/analytics.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/services/analytics.js",
      "apps/catalog/routes/categories/services/monitoring.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/services/monitoring.js",
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
      "apps/workspaces/resources/custom-elements/charts/chart-header.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/charts/chart-header.js",
      "apps/workspaces/resources/custom-elements/charts/chart-stat.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/charts/doughnut-chart.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/charts/doughnut-chart.js",
      "apps/workspaces/resources/custom-elements/charts/line-chart.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/charts/line-chart.js",
      "apps/workspaces/resources/custom-elements/navigator/application/application-navigator.js",
      "apps/workspaces/resources/custom-elements/navigator/navigator-element.js",
      "apps/workspaces/resources/custom-elements/navigator/navigator.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/navigator/navigator.js",
      "apps/workspaces/resources/custom-elements/navigator/workspace/root-navigator.js",
      "apps/workspaces/resources/custom-elements/navigator/workspace/workspace-elements.js",
      "apps/workspaces/resources/custom-elements/navigator/workspace/workspace-navigator.js",
      "apps/workspaces/resources/custom-elements/properties.js",
      "apps/workspaces/resources/custom-elements/property-editor/property-editor.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/property-editor/property-editor.js",
      "apps/workspaces/resources/custom-elements/table/application-row.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/table/application-row.js",
      "apps/workspaces/resources/custom-elements/table/host-row.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/table/instance-overview-row.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/table/instance-row.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/table/instance-row.js",
      "apps/workspaces/resources/custom-elements/table/provider-row.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/wizard/create/create-workspace-wizard.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/wizard/create/create-workspace-wizard.js",
      "apps/workspaces/resources/custom-elements/wizard/deploy/forms/app-customize-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/wizard/deploy/forms/app-customize-form.js",
      "apps/workspaces/resources/custom-elements/wizard/deploy/forms/instance-details-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/wizard/deploy/forms/instance-details-form.js",
      "apps/workspaces/resources/custom-elements/wizard/deploy/forms/instance-type-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/wizard/deploy/forms/instance-type-form.js",
      "apps/workspaces/resources/custom-elements/wizard/deploy/forms/summary-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/wizard/deploy/forms/summary-form.js",
      "apps/workspaces/resources/custom-elements/wizard/wizard.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/wizard/wizard.js",
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
      "apps/workspaces/routes/workspace/applications/application/activity.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/activity.js",
      "apps/workspaces/routes/workspace/applications/application/application.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/application.js",
      "apps/workspaces/routes/workspace/applications/application/container/container.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/container.js",
      "apps/workspaces/routes/workspace/applications/application/container/containers.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/containers.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/dialogs/variable.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/dialogs/variable.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/dockerfile.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/dockerfile.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/files.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/files.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/general.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/general.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/output.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/output.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/variables.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/variables.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/applications.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/deployer.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/deployer.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/instances.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/instances.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/node-template.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/node-template.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/operating-system.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/operating-system.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/service.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/service.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/version.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/version.js",
      "apps/workspaces/routes/workspace/applications/application/settings.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/settings.js",
      "apps/workspaces/routes/workspace/applications/application/summary.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/summary.js",
      "apps/workspaces/routes/workspace/applications/application/type/docker-compose/apps.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/type/docker-compose/apps.js",
      "apps/workspaces/routes/workspace/applications/application/type/docker-compose/compose.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/type/docker-compose/compose.js",
      "apps/workspaces/routes/workspace/applications/application/type/docker-compose/docker-compose.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/type/docker-compose/docker-compose.js",
      "apps/workspaces/routes/workspace/applications/application/versions.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/versions.js",
      "apps/workspaces/routes/workspace/applications/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/applications.js",
      "apps/workspaces/routes/workspace/applications/create/app-details.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/create/app-details.js",
      "apps/workspaces/routes/workspace/create/create.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/create/create.js",
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
      "apps/workspaces/routes/workspace/infrastructure/clouds/add-cloud.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/add-cloud.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/add-credential.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/add-credential.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/cloud-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/cloud-form.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/clouds.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/clouds.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/applications/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/applications/applications.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/environment.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/environment.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/hosts/hosts.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/hosts/hosts.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/keypairs/keypairs.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/keypairs/keypairs.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/network/network.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/network/network.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/storage/storage.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/storage/storage.js",
      "apps/workspaces/routes/workspace/infrastructure/hosts/hosts.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/hosts/hosts.js",
      "apps/workspaces/routes/workspace/infrastructure/infrastructure.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/infrastructure.js",
      "apps/workspaces/routes/workspace/infrastructure/keypairs/keypairs.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/keypairs/keypairs.js",
      "apps/workspaces/routes/workspace/infrastructure/storage/storage.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/storage/storage.js",
      "apps/workspaces/routes/workspace/provisioning/design/design.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/design/design.js",
      "apps/workspaces/routes/workspace/provisioning/images/images.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/images/images.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/create-instance.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/create-instance.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/forms/app-customize-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/forms/app-customize-form.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/forms/instance-details-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/forms/instance-details-form.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/forms/instance-type-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/forms/instance-type-form.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/forms/summary-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/forms/summary-form.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/activity/activity.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/activity/activity.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/console/console.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/console/console.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/instance.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/instance.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/logs/logs.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/logs/logs.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/monitoring/monitoring.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/monitoring/monitoring.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/overview/overview.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/overview/overview.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instances.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instances.js",
      "apps/workspaces/routes/workspace/provisioning/instances/new.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/new.js",
      "apps/workspaces/routes/workspace/provisioning/instances/update/update-instance.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/update/update-instance.js",
      "apps/workspaces/routes/workspace/provisioning/instances/wizard/cloud.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/wizard/cloud.js",
      "apps/workspaces/routes/workspace/provisioning/instances/wizard/configure.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/wizard/configure.js",
      "apps/workspaces/routes/workspace/provisioning/instances/wizard/wizard.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/wizard/wizard.js",
      "apps/workspaces/routes/workspace/provisioning/logs/log.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/logs/log.js",
      "apps/workspaces/routes/workspace/provisioning/logs/logs.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/logs/logs.js",
      "apps/workspaces/routes/workspace/provisioning/provisioning.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/provisioning.js",
      "apps/workspaces/routes/workspace/settings/settings.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/settings/settings.js",
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
      "common/lib/events.js",
      "common/lib/events/websockets.js",
      "common/lib/geometry.js",
      "common/lib/geometry/shapes.js",
      "common/lib/io.js",
      "common/lib/io/io.js",
      "common/lib/io/io/file.js",
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
      "common/lib/utils/instruction-parser.js",
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
      "common/model/api/application/model.js",
      "common/model/api/application/service.js",
      "common/model/api/core.js",
      "common/model/api/hal.js",
      "common/model/api/hal/api.js",
      "common/model/api/hal/cloud.js",
      "common/model/api/hal/compute.js",
      "common/model/api/hal/image.js",
      "common/model/api/hal/os.js",
      "common/model/api/revision/revisions.js",
      "common/model/api/sdk.js",
      "common/model/api/workspace/model.js",
      "common/model/api/workspace/service.js",
      "common/model/common.js",
      "common/model/common/context-resolver.js",
      "common/model/common/service-manager.js",
      "common/model/common/variable.js",
      "common/model/security.js",
      "common/model/security/credentials.js",
      "common/model/security/token.js",
      "common/model/security/user.js",
      "common/model/service.js",
      "common/model/service/service.js",
      "common/resources/custom-components/bootstrap-form-renderer.js",
      "common/resources/custom-components/fetch-client-errors.js",
      "common/resources/custom-components/incomplete-feature.js",
      "common/resources/custom-components/semantic-ui-renderer.js",
      "common/resources/custom-elements/footer/footer.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/footer/footer.js",
      "common/resources/custom-elements/form/multi-step-form.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/form/multi-step-form.js",
      "common/resources/custom-elements/nav-bar/activity-monitor-dropdown.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/activity-monitor-dropdown.js",
      "common/resources/custom-elements/nav-bar/activity-progress-bar.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/activity-progress-bar.js",
      "common/resources/custom-elements/nav-bar/alerts-dropdown.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/alerts-dropdown.js",
      "common/resources/custom-elements/nav-bar/navbar.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/navbar.js",
      "common/resources/custom-elements/nav-bar/page-header.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/profile-dropdown.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/profile-dropdown.js",
      "common/resources/custom-elements/summary/summary.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/summary/summary.js",
      "common/resources/custom-elements/table/row.js",
      "common/resources/custom-elements/tree.js",
      "common/resources/custom-elements/tree/node.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/tree/node.js",
      "common/resources/custom-elements/tree/tree.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/tree/tree.js",
      "common/resources/nested-application/nested-application.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/nested-application/nested-application.js",
      "css/styles.min.css!github:systemjs/plugin-text@0.0.9.js",
      "main.js"
    ]
  },
  depCache: {
    "app.js": [
      "aurelia-framework",
      "aurelia-router",
      "common/model/security",
      "aurelia-dependency-injection",
      "common/model/common/context-resolver",
      "apps/workspaces/resources/custom-elements/navigator/workspace/root-navigator",
      "./apps/workspaces/resources/custom-elements/navigator/navigator-element",
      "jquery"
    ],
    "apps/admin/admin.js": [
      "aurelia-framework",
      "common/model/api/hal/api",
      "common/model/security/credentials",
      "aurelia-fetch-client",
      "aurelia-validation",
      "common/resources/custom-components/bootstrap-form-renderer"
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
      "common/model/security",
      "common/lib/storage/local",
      "common/lib/utils/uuid",
      "apps/auth/auth",
      "aurelia-router"
    ],
    "apps/auth/signup/signup.js": [
      "aurelia-dependency-injection",
      "aurelia-framework",
      "apps/auth/auth",
      "common/model/security",
      "aurelia-router",
      "common/lib/utils/uuid",
      "aurelia-fetch-client"
    ],
    "apps/catalog/index.js": [
      "aurelia-framework",
      "apps/workspaces/routes/workspace/provisioning/instances/wizard/wizard"
    ],
    "apps/catalog/routes/categories/apps/containers.js": [
      "common/resources/custom-components/incomplete-feature",
      "aurelia-fetch-client",
      "aurelia-framework",
      "aurelia-event-aggregator",
      "apps/catalog/index"
    ],
    "apps/catalog/routes/categories/apps/custom.js": [
      "apps/catalog/index",
      "aurelia-fetch-client",
      "aurelia-framework",
      "aurelia-event-aggregator",
      "common/model/api/workspace/service",
      "common/resources/custom-components/incomplete-feature"
    ],
    "apps/catalog/routes/categories/categories.js": [
      "aurelia-framework"
    ],
    "apps/workspaces/index.js": [
      "aurelia-router",
      "aurelia-framework",
      "aurelia-fetch-client",
      "common/model/api/workspace/service"
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
    "apps/workspaces/resources/custom-elements/charts/doughnut-chart.js": [
      "aurelia-framework",
      "chart.js"
    ],
    "apps/workspaces/resources/custom-elements/charts/line-chart.js": [
      "aurelia-framework",
      "chart.js"
    ],
    "apps/workspaces/resources/custom-elements/navigator/application/application-navigator.js": [
      "../navigator-element",
      "aurelia-framework"
    ],
    "apps/workspaces/resources/custom-elements/navigator/navigator-element.js": [
      "lodash",
      "aurelia-framework",
      "rxjs/Subject"
    ],
    "apps/workspaces/resources/custom-elements/navigator/navigator.js": [
      "common/lib/utils/uuid",
      "aurelia-framework",
      "./navigator-element",
      "aurelia-animator-velocity",
      "rxjs/Observable",
      "materialize-css",
      "mdi/css/materialdesignicons.css!",
      "rxjs/add/observable/fromEvent",
      "rxjs/add/operator/debounceTime"
    ],
    "apps/workspaces/resources/custom-elements/navigator/workspace/root-navigator.js": [
      "lodash",
      "../navigator-element",
      "aurelia-framework",
      "common/model/api/workspace/service",
      "./workspace-elements"
    ],
    "apps/workspaces/resources/custom-elements/navigator/workspace/workspace-elements.js": [
      "materialize-css",
      "common/model/api/workspace/model"
    ],
    "apps/workspaces/resources/custom-elements/navigator/workspace/workspace-navigator.js": [
      "../navigator-element",
      "aurelia-framework",
      "./root-navigator",
      "common/model/api/workspace/service",
      "./workspace-elements"
    ],
    "apps/workspaces/resources/custom-elements/properties.js": [
      "./property-editor/property-editor"
    ],
    "apps/workspaces/resources/custom-elements/property-editor/property-editor.js": [
      "aurelia-framework"
    ],
    "apps/workspaces/resources/custom-elements/table/application-row.js": [
      "aurelia-framework"
    ],
    "apps/workspaces/resources/custom-elements/table/instance-row.js": [
      "aurelia-framework"
    ],
    "apps/workspaces/resources/custom-elements/wizard/wizard.js": [
      "aurelia-dependency-injection"
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
    "apps/workspaces/routes/workspace/applications/application/activity.js": [
      "aurelia-framework",
      "chart.js"
    ],
    "apps/workspaces/routes/workspace/applications/application/application.js": [
      "aurelia-framework",
      "common/model/api/application/model",
      "common/model/api/workspace/service",
      "common/model/api/application/service"
    ],
    "apps/workspaces/routes/workspace/applications/application/container/container.js": [
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "apps/workspaces/routes/workspace/applications/application/container/containers.js": [
      "aurelia-router",
      "aurelia-framework"
    ],
    "apps/workspaces/routes/workspace/applications/application/container/settings/dockerfile.js": [
      "ace",
      "aurelia-framework",
      "common/model/api/application/service"
    ],
    "apps/workspaces/routes/workspace/applications/application/container/settings/files.js": [
      "aurelia-framework",
      "common/lib/io",
      "common/model/api/application/service"
    ],
    "apps/workspaces/routes/workspace/applications/application/container/settings/general.js": [
      "aurelia-framework",
      "aurelia-router",
      "aurelia-fetch-client"
    ],
    "apps/workspaces/routes/workspace/applications/application/container/settings/output.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "xterm"
    ],
    "apps/workspaces/routes/workspace/applications/application/container/settings/variables.js": [
      "aurelia-dependency-injection",
      "aurelia-fetch-client",
      "./dialogs/variable",
      "aurelia-dialog",
      "common/lib/utils/instruction-parser",
      "node-docker-file-parser"
    ],
    "apps/workspaces/routes/workspace/applications/application/dialogs/applications.js": [
      "aurelia-dialog",
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "apps/workspaces/routes/workspace/applications/application/dialogs/deployer.js": [
      "aurelia-dialog",
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "apps/workspaces/routes/workspace/applications/application/dialogs/instances.js": [
      "aurelia-dialog",
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "apps/workspaces/routes/workspace/applications/application/dialogs/node-template.js": [
      "aurelia-dialog",
      "aurelia-framework",
      "aurelia-fetch-client",
      "common/model/api/hal/compute",
      "common/model/api/hal/os",
      "common/model/api/hal/api",
      "common/lib/utils/uuid"
    ],
    "apps/workspaces/routes/workspace/applications/application/dialogs/operating-system.js": [
      "aurelia-dialog",
      "aurelia-framework",
      "aurelia-fetch-client",
      "common/model/api/hal/os"
    ],
    "apps/workspaces/routes/workspace/applications/application/dialogs/service.js": [
      "aurelia-dialog",
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "apps/workspaces/routes/workspace/applications/application/dialogs/version.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "aurelia-dialog",
      "aurelia-dependency-injection"
    ],
    "apps/workspaces/routes/workspace/applications/application/settings.js": [
      "aurelia-framework",
      "common/model/api/application/model",
      "common/model/api/application/service",
      "aurelia-router"
    ],
    "apps/workspaces/routes/workspace/applications/application/summary.js": [
      "showdown",
      "aurelia-fetch-client",
      "./application",
      "aurelia-framework",
      "aurelia-dialog",
      "./dialogs/node-template",
      "./dialogs/operating-system",
      "./dialogs/deployer",
      "common/model/api/hal/api",
      "./dialogs/applications",
      "./dialogs/service",
      "./dialogs/instances",
      "common/model/api/application/service"
    ],
    "apps/workspaces/routes/workspace/applications/application/type/docker-compose/compose.js": [
      "ace",
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "apps/workspaces/routes/workspace/applications/application/type/docker-compose/docker-compose.js": [
      "aurelia-dependency-injection",
      "aurelia-fetch-client"
    ],
    "apps/workspaces/routes/workspace/applications/application/versions.js": [
      "aurelia-dialog",
      "aurelia-dependency-injection",
      "./dialogs/version",
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "apps/workspaces/routes/workspace/applications/applications.js": [
      "aurelia-fetch-client",
      "aurelia-framework",
      "aurelia-dependency-injection",
      "common/model/api/workspace/model",
      "common/model/api/workspace/service",
      "apps/workspaces/routes/workspace/index"
    ],
    "apps/workspaces/routes/workspace/applications/create/app-details.js": [
      "aurelia-framework",
      "common/model/api/application/service",
      "common/model/api/application/model",
      "apps/workspaces/routes/workspace/applications/applications"
    ],
    "apps/workspaces/routes/workspace/create/create.js": [
      "aurelia-framework",
      "apps/workspaces/routes/workspace/index",
      "common/model/api/workspace/model",
      "common/model/api/workspace/service",
      "aurelia-router"
    ],
    "apps/workspaces/routes/workspace/dashboard/dashboard.js": [
      "aurelia-fetch-client",
      "apps/workspaces/routes/workspace/index",
      "aurelia-dependency-injection"
    ],
    "apps/workspaces/routes/workspace/designer/abstract-graph.js": [
      "mxgraph",
      "rxjs/Subject",
      "aurelia-pal"
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
      "common/model/api/workspace/service",
      "apps/workspaces/resources/custom-elements/navigator/workspace/workspace-navigator",
      "apps/workspaces/resources/custom-elements/navigator/navigator-element"
    ],
    "apps/workspaces/routes/workspace/infrastructure/clouds/add-cloud.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "common/model/api/hal/api",
      "common/model/security/credentials",
      "apps/workspaces/routes/workspace/index"
    ],
    "apps/workspaces/routes/workspace/infrastructure/clouds/add-credential.js": [
      "aurelia-framework",
      "common/model/security/credentials",
      "aurelia-fetch-client",
      "aurelia-validation",
      "common/resources/custom-components/bootstrap-form-renderer",
      "apps/workspaces/routes/workspace/index"
    ],
    "apps/workspaces/routes/workspace/infrastructure/clouds/clouds.js": [
      "aurelia-framework",
      "common/model/api/hal/api",
      "aurelia-fetch-client",
      "apps/workspaces/routes/workspace/index",
      "common/model/security/user",
      "common/resources/custom-components/incomplete-feature"
    ],
    "apps/workspaces/routes/workspace/infrastructure/clouds/environment/applications/applications.js": [
      "../hosts/hosts",
      "aurelia-dependency-injection",
      "aurelia-framework"
    ],
    "apps/workspaces/routes/workspace/infrastructure/clouds/environment/environment.js": [
      "../../../../../index",
      "aurelia-dependency-injection"
    ],
    "apps/workspaces/routes/workspace/infrastructure/clouds/environment/hosts/hosts.js": [
      "apps/workspaces/routes/workspace/index",
      "aurelia-framework",
      "aurelia-dependency-injection"
    ],
    "apps/workspaces/routes/workspace/provisioning/instances/create/create-instance.js": [
      "aurelia-framework"
    ],
    "apps/workspaces/routes/workspace/provisioning/instances/create/forms/app-customize-form.js": [
      "../../wizard/wizard",
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "apps/workspaces/routes/workspace/provisioning/instances/create/forms/instance-details-form.js": [
      "../../wizard/wizard",
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "apps/workspaces/routes/workspace/provisioning/instances/create/forms/summary-form.js": [
      "../../wizard/wizard",
      "aurelia-framework"
    ],
    "apps/workspaces/routes/workspace/provisioning/instances/instance/instance.js": [
      "apps/workspaces/routes/workspace/index",
      "aurelia-dependency-injection"
    ],
    "apps/workspaces/routes/workspace/provisioning/instances/instance/overview/overview.js": [
      "aurelia-framework",
      "chart.js"
    ],
    "apps/workspaces/routes/workspace/provisioning/instances/instances.js": [
      "aurelia-framework",
      "aurelia-fetch-client",
      "common/lib/events/websockets",
      "apps/workspaces/routes/workspace/index",
      "aurelia-dialog",
      "aurelia-dependency-injection",
      "./update/update-instance",
      "aurelia-event-aggregator",
      "common/resources/custom-components/incomplete-feature",
      "chart.js"
    ],
    "apps/workspaces/routes/workspace/provisioning/instances/new.js": [
      "aurelia-framework",
      "common/lib/utils/uuid",
      "common/model/api/hal/os",
      "apps/workspaces/routes/workspace/index",
      "aurelia-fetch-client",
      "common/model/security/credentials",
      "common/model/api/hal/compute",
      "common/lib/events",
      "aurelia-validation",
      "common/resources/custom-components/bootstrap-form-renderer"
    ],
    "apps/workspaces/routes/workspace/provisioning/instances/update/update-instance.js": [
      "aurelia-dialog",
      "aurelia-framework",
      "aurelia-fetch-client",
      "aurelia-dependency-injection"
    ],
    "apps/workspaces/routes/workspace/provisioning/instances/wizard/cloud.js": [
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "apps/workspaces/routes/workspace/provisioning/instances/wizard/wizard.js": [
      "apps/workspaces/routes/workspace/index",
      "aurelia-framework",
      "aurelia-fetch-client",
      "aurelia-event-aggregator",
      "common/lib/utils/uuid",
      "common/lib/events/websockets",
      "common/resources/custom-elements/nav-bar/activity-monitor-dropdown"
    ],
    "apps/workspaces/routes/workspace/provisioning/logs/logs.js": [
      "aurelia-framework",
      "aurelia-event-aggregator",
      "common/lib/events/websockets"
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
    "common/lib/events.js": [
      "./events/websockets"
    ],
    "common/lib/events/websockets.js": [
      "rxjs/Subject",
      "rxjs/add/operator/filter",
      "rxjs/add/operator/map"
    ],
    "common/lib/io.js": [
      "./io/io"
    ],
    "common/lib/io/io.js": [
      "./io/file"
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
    "common/lib/utils/instruction-parser.js": [
      "../../model/common/variable"
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
    "common/model/api/application/model.js": [
      "common/model/api/core"
    ],
    "common/model/api/application/service.js": [
      "aurelia-http-client",
      "aurelia-fetch-client",
      "aurelia-framework",
      "common/model/api/workspace/service",
      "./model",
      "common/model/common/service-manager",
      "common/lib/lang"
    ],
    "common/model/api/hal.js": [
      "./hal/os",
      "./hal/api",
      "./hal/image"
    ],
    "common/model/api/hal/api.js": [
      "common/lib/utils"
    ],
    "common/model/api/hal/os.js": [
      "./api",
      "common/lib/utils/uuid"
    ],
    "common/model/api/revision/revisions.js": [
      "aurelia-framework",
      "aurelia-fetch-client"
    ],
    "common/model/api/workspace/model.js": [
      "common/model/api/core"
    ],
    "common/model/api/workspace/service.js": [
      "aurelia-fetch-client",
      "aurelia-http-client",
      "common/lib/lang",
      "common/model/api/application/model",
      "./model",
      "aurelia-dependency-injection",
      "common/model/service"
    ],
    "common/model/common.js": [
      "./common/context-resolver"
    ],
    "common/model/common/context-resolver.js": [
      "./service-manager",
      "apps/workspaces/resources/custom-elements/navigator/navigator-element"
    ],
    "common/model/common/service-manager.js": [
      "lodash"
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
    "common/model/service.js": [
      "./service/service",
      "./common/service-manager"
    ],
    "common/resources/custom-components/fetch-client-errors.js": [
      "aurelia-event-aggregator",
      "aurelia-framework"
    ],
    "common/resources/custom-components/incomplete-feature.js": [
      "pnotify",
      "pnotify.callbacks"
    ],
    "common/resources/custom-components/semantic-ui-renderer.js": [
      "aurelia-pal"
    ],
    "common/resources/custom-elements/footer/footer.js": [
      "aurelia-event-aggregator",
      "aurelia-framework",
      "pnotify",
      "common/resources/custom-components/incomplete-feature",
      "pnotify.callbacks"
    ],
    "common/resources/custom-elements/form/multi-step-form.js": [
      "aurelia-framework"
    ],
    "common/resources/custom-elements/nav-bar/activity-monitor-dropdown.js": [
      "common/lib/events",
      "aurelia-framework",
      "aurelia-event-aggregator"
    ],
    "common/resources/custom-elements/nav-bar/activity-progress-bar.js": [
      "aurelia-framework",
      "./activity-monitor-dropdown",
      "pnotify",
      "pnotify.callbacks"
    ],
    "common/resources/custom-elements/nav-bar/profile-dropdown.js": [
      "common/model/security",
      "aurelia-framework",
      "aurelia-router",
      "common/resources/custom-components/incomplete-feature",
      "common/lib/utils/uuid",
      "jquery"
    ],
    "common/resources/custom-elements/summary/summary.js": [
      "aurelia-framework"
    ],
    "common/resources/custom-elements/table/row.js": [
      "aurelia-framework",
      "aurelia-dependency-injection"
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
    "common/resources/nested-application/nested-application.js": [
      "aurelia-framework"
    ],
    "main.js": [
      "aurelia-fetch-client",
      "aurelia-http-client",
      "common/lib/storage/local/local-storage",
      "common/model/security",
      "common/lib/events",
      "aurelia-event-aggregator",
      "./common/resources/custom-components/fetch-client-errors",
      "common/resources/custom-components/semantic-ui-renderer",
      "jquery",
      "fetch",
      "materialize-css"
    ]
  }
});