var path = require('path');
module.exports = {
  // JavaScript entry point
  entry: './App.js',
  // JavaScrip bundle file
  output: {
    path: path.resolve('./'),
    filename: 'index.js'
  },
  // Setup server
  devServer: {
    inline: true,
    port: 8081
  },
  module: {
    // JS, JSX and SASS loaders
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};