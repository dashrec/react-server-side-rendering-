const path = require('path');
const merge = require('webpack-merge');
const baseConfig= require('./webpack.base.js');

const config = {
  //tell webpack the entry point for browser side codebase
  entry: './src/client/client.js',

  //webpack where to put the bundle file after building bundle.js file

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'), //current working dir
  }
};
module.exports = merge(baseConfig, config)
// conclusion
// This whole file is going to allow us to write jsx code on our server, convert it to es5 so that it can be executed by node.
