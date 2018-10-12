var fs = require("fs"),
    rollup = require("rollup"),
    XMLHttpRequest = require('xhr2').XMLHttpRequest,
    dependencies = require("./package.json").dependencies;

rollup.rollup({
  input: "src/index.js",
  external: Object.keys(dependencies)
}).then(function(bundle) {
  return bundle.generate({format: "cjs"});
}).then(function(result) {
  var code = result.code + "Object.defineProperty(exports, \"event\", {get: function() { return d3Selection.event; }});\n";
  return new Promise(function(resolve, reject) {
    fs.writeFile("dist/sagaGenesis.js", code, "utf8", function(error) {
      if (error) return reject(error);
      else resolve();
    });
  });
}).catch(abort);

function abort(error) {
  console.error(error.stack);
}
