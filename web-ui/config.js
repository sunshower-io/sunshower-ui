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
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.1",
    "aurelia-animator-velocity": "npm:aurelia-animator-velocity@1.0.1",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.1",
    "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
    "aurelia-dialog": "npm:aurelia-dialog@1.0.0-beta.3.0.1",
    "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.1.0",
    "aurelia-framework": "npm:aurelia-framework@1.0.8",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
    "aurelia-http-client": "npm:aurelia-http-client@1.0.4",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
    "aurelia-pal": "npm:aurelia-pal@1.3.0",
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
    "chart.js": "npm:chart.js@2.5.0",
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
    "rxjs": "npm:rxjs@5.2.0",
    "semantic-ui": "github:Semantic-Org/Semantic-UI@2.2.7",
    "showdown": "npm:showdown@1.6.4",
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
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-animator-velocity@1.0.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0",
      "velocity-animate": "npm:velocity-animate@1.4.0"
    },
    "npm:aurelia-binding@1.1.1": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0"
    },
    "npm:aurelia-bootstrapper@1.0.1": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-framework": "npm:aurelia-framework@1.0.8",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
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
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
    },
    "npm:aurelia-dialog@1.0.0-beta.3.0.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
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
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-history-browser@1.0.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
    },
    "npm:aurelia-http-client@1.0.4": {
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-loader-default@1.0.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
    },
    "npm:aurelia-loader@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-logging-console@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0"
    },
    "npm:aurelia-metadata@1.0.3": {
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
    },
    "npm:aurelia-pal-browser@1.1.0": {
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
    },
    "npm:aurelia-polyfills@1.1.1": {
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
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
      "aurelia-pal": "npm:aurelia-pal@1.3.0"
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
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-templating-router@1.0.1": {
      "aurelia-binding": "npm:aurelia-binding@1.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
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
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0"
    },
    "npm:aurelia-validation@1.0.0-beta.1.0.1": {
      "aurelia-binding": "npm:aurelia-binding@1.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.3.0",
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
    "npm:builtin-modules@1.1.1": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:chart.js@2.5.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
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
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
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
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
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
      "css": "github:systemjs/plugin-css@0.1.32"
    },
    "npm:graceful-fs@4.1.11": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:hosted-git-info@2.2.0": {
      "url": "github:jspm/nodelibs-url@0.1.0"
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
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:os-locale@1.4.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "lcid": "npm:lcid@1.0.0",
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
    "npm:readable-stream@1.0.34": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:require-directory@2.1.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:require-main-filename@1.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:rxjs@5.2.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
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
      "readable-stream": "npm:readable-stream@1.0.34"
    },
    "npm:string-width@1.0.2": {
      "code-point-at": "npm:code-point-at@1.1.0",
      "is-fullwidth-code-point": "npm:is-fullwidth-code-point@1.0.0",
      "strip-ansi": "npm:strip-ansi@3.0.1"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:strip-ansi@3.0.1": {
      "ansi-regex": "npm:ansi-regex@2.1.1"
    },
    "npm:strip-bom@2.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "is-utf8": "npm:is-utf8@0.2.1"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
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
    "npm:velocity-animate@1.4.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:wrap-ansi@2.1.0": {
      "string-width": "npm:string-width@1.0.2",
      "strip-ansi": "npm:strip-ansi@3.0.1"
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
      "npm:aurelia-http-client@1.0.4.js",
      "npm:aurelia-http-client@1.0.4/aurelia-http-client.js",
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
      "npm:aurelia-pal@1.3.0.js",
      "npm:aurelia-pal@1.3.0/aurelia-pal.js",
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
      "npm:aurelia-validation@1.0.0-beta.1.0.1.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/aurelia-validation.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/implementation/rules.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/implementation/standard-validator.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/implementation/util.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/implementation/validation-messages.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/implementation/validation-parser.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/implementation/validation-rules.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/property-info.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/validate-binding-behavior-base.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/validate-binding-behavior.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/validate-result.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/validate-trigger.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/validation-controller-factory.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/validation-controller.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/validation-errors-custom-attribute.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/validation-renderer-custom-attribute.js",
      "npm:aurelia-validation@1.0.0-beta.1.0.1/validator.js",
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
      "apps/admin/admin.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/auth-nav.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/auth.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/login/login.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/auth/signup/signup.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/index.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/apps/containers.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/apps/custom.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/categories.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/infrastructure/compute.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/infrastructure/network.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/infrastructure/storage.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/services/analytics.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/catalog/routes/categories/services/monitoring.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/index.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/charts/chart-header.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/charts/chart-stat.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/charts/doughnut-chart.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/charts/line-chart.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/property-editor/property-editor.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/table/application-row.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/table/host-row.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/table/instance-overview-row.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/table/instance-row.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/table/provider-row.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/wizard/create/create-workspace-wizard.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/wizard/deploy/forms/app-customize-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/wizard/deploy/forms/instance-details-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/wizard/deploy/forms/instance-type-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/wizard/deploy/forms/summary-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/custom-elements/wizard/wizard.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/cloud/basic.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/cloud/credentials.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/cloud/full.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/deployment/basic.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/deployment/full.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/infrastructure-node/basic.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/infrastructure-node/cloud.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/infrastructure-node/credentials.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/infrastructure-node/full.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/load-balancer/editor.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/security-group/basic.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/resources/editors/security-group/full.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/add-application.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/activity.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/application.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/container.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/containers.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/args.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/dockerfile.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/files.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/general.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/output.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/ports.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/container/settings/volumes.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/deployer.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/instances.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/node-template.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/operating-system.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/service.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/dialogs/version.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/summary.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/tasks.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/application/versions.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/applications/create/app-details.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/create/create.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/dashboard/dashboard.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/components/add-infrastructure.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/components/infrastructure.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/components/properties.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/element-editor.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/execution/execution-dialog.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/file/deploy-dialog.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/menus/file/save-dialog.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/controls.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/left-sidebar/bottom/layers.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/left-sidebar/left-sidebar.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/bottom/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/bottom/blocks.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/bottom/components.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/right-sidebar.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/top/editor.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/top/palette.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/applications/sidebars/right-sidebar/top/properties.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/breadcrumb/breadcrumb.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/context-menu/dialogs/group-items-as-dialog.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/designer/designer.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/index.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/add-cloud.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/add-credential.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/cloud-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/clouds.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/applications/applications.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/environment.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/hosts/hosts.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/keypairs/keypairs.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/network/network.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/clouds/environment/storage/storage.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/hosts/hosts.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/infrastructure.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/keypairs/keypairs.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/infrastructure/storage/storage.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/design/design.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/images/images.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/create-instance.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/forms/app-customize-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/forms/instance-details-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/forms/instance-type-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/create/forms/summary-form.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/activity/activity.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/console/console.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/instance.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/logs/logs.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/monitoring/monitoring.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instance/overview/overview.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/instances.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/new.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/update/update-instance.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/wizard/cloud.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/wizard/configure.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/instances/wizard/wizard.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/logs/log.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/logs/logs.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/provisioning/provisioning.html!github:systemjs/plugin-text@0.0.9.js",
      "apps/workspaces/routes/workspace/settings/settings.html!github:systemjs/plugin-text@0.0.9.js",
      "common/lib/widget/menu/menu.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/footer/footer.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/form/multi-step-form.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/activity-monitor-dropdown.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/activity-progress-bar.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/alerts-dropdown.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/navbar.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/page-header.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/nav-bar/profile-dropdown.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/tree/node.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/custom-elements/tree/tree.html!github:systemjs/plugin-text@0.0.9.js",
      "common/resources/nested-application/nested-application.html!github:systemjs/plugin-text@0.0.9.js"
    ]
  },
  depCache: {}
});