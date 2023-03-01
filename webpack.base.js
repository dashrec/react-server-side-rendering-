module.exports = {
    // tell webpack to run babel on every file it runs through
  // jsx and ES 2015, 2016, 2017 code and turns it into equivalent ES5.
  module: {
    rules: [
      {
        test: /\.js?$/, //regex test every filename that included in our web project
        loader: 'babel-loader', // execute babel and transpiles our code
        exclude: /node_modules/,
        options: {
          presets: [
            'react', // take all jsx and turn to normal js code
            'stage-0', // used for handling for some async code
            ['env', { targets: { browsers: ['last 2 versions'] } }],
          ],
        },
      },
    ],
  },
}



//test: /\.js?$/ ensures that we only ever tried to apply babel to JavaScript files and that we don't try to run
//babble over, say, css files or images or JSON files or so on.

// env preset says run all of the different transform rules needed to meet the requirements of the latest two versions of all popular browsers.
