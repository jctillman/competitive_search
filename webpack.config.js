const webpack = require('webpack');
const path = require('path');
const appSrc = path.join(__dirname, 'src');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  context: __dirname,
  resolve: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: appSrc,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin()
  ]
};
