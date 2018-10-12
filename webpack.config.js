'use strict';

const path = require('path')

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    libraryTarget: 'umd',
    // Output path using nodeJs path module
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
}
