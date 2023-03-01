const path = require('path');
const merge = require('webpack-merge');
const baseConfig= require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  //Inform webpack that we're building a bundle for node js, rather than the browser
  target: 'node',

  //tell webpack the root file, entry point,  of our server application
  entry: './src/index.js',

  //tell webpack where to put the output file that is generated
  //so after building bundle.js file for serverSide code, here is where it should be placed
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'), //current working dir
  },
// So this is going to tell webpack to not bundle any libraries into our output bundle on the server
// if that library exists inside the node modules folder.
externals: [webpackNodeExternals()]

};
module.exports = merge(baseConfig, config);// one baseConfig for serverSide and clientSide rendering

//test: /\.js?$/ ensures that we only ever tried to apply babel to JavaScript files and that we don't try to run
//babble over, say, css files or images or JSON files or so on.

// env preset says run all of the different transform rules needed to meet the requirements of the latest two versions of all popular browsers.

// conclusion
// This whole file is going to allow us to write jsx code on our server, convert it to es5 so that it can be executed by node.
