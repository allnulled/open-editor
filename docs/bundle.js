// 1. Bundle components:
require("@allnulled/vuebundler").bundle({
  list: __dirname + "/bundlelist.components.js",
  module: true,
  id: "Litestarter_app_components",
  output: __dirname + "/dist/components.js",
  ignore: [],
});

// 2. Bundle js:
require("@allnulled/htmlbundler").bundle({
  list: __dirname + "/bundlelist.js.js",
  module: true,
  id: "Litestarter_app",
  output: __dirname + "/dist/app.js",
  ignore: [],
  wrap: false,
});

// 3. Bundle css:
require("@allnulled/htmlbundler").bundle({
  list: __dirname + "/bundlelist.css.js",
  module: true,
  id: "Litestarter_app",
  output: __dirname + "/dist/app.css",
  ignore: [],
  wrap: false,
});
