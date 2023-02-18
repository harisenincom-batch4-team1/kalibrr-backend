const NodeWebExternals = require("webpack-node-externals");
const path = require("path");
require("dotenv").config();

module.exports = {
  target: "node",
  entry: "./index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: [NodeWebExternals()],
};
