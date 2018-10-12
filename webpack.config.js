'use strict';

const path = require('path')

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    // Output path using nodeJs path module
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    "debug": "debug",
    "ethjs-abi": "ethjs-abi",
    "react": "react",
    "redux": "redux",
    "react-redux": "react-redux",
    "redux-saga": "redux-saga",
    "web3": "web3"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react']
        }
      }
    ]
  }
}
