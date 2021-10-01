const withTM = require("next-transpile-modules")([
  "react-markdown",
  "dateformat",
  "vfile",
  "unist-util-stringify-position",
  "unified",
  "bail",
  "is-plain-obj",
  "trough",
]);

module.exports = withTM({
  webpack5: false,
});
