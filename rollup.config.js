import ascii from "rollup-plugin-ascii"
import resolve from "rollup-plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import babel from 'rollup-plugin-babel'
// import commonjs from 'rollup-plugin-commonjs'

import * as meta from "./package.json"

const copyright = `// ${meta.name} v${meta.version}
// Copyright ${(new Date).getFullYear()} ${meta.author}
// ${meta.homepage}
`

// const dependencies = Object.keys(require('./package.json').dependencies)
// console.log(dependencies)
//   external: dependencies

const config = {
  input: "src/index",
  plugins: [
    resolve({
      extensions: [ '.js', '.jsx', '.json' ],
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    // commonjs(),
    babel({
      exclude: 'node_modules/**',
      externalHelpers: true,
      runtimeHelpers: true
    }),
    ascii()
  ],
  output: {
    extend: true,
    banner: copyright,
    file: "dist/sagaGenesis.js",
    format: "iife",
    indent: false,
    name: "sagaGenesis"//,
    // globals: {
    //   'web3': 'Web3',
    //   'react': 'react',
    //   'react-redux': 'reactRedux',
    //   'redux-saga': 'reduxSaga',
    //   'ethjs-abi': 'abi',
    //   'prop-types': 'PropTypes',
    //   'bn.js': 'BN'
    // }
  },
  external: [
    'debug',
    'web3',
    'react',
    'react-redux',
    'redux-saga',
    'ethjs-abi',
    'prop-types',
    'bn.js'
  ]
}

const minifiedPlugins = [
  ...config.plugins,
  terser({ output: { preamble: copyright } })
]
// console.log(minifiedPlugins)

const minifiedConfig = {
  ...config,
  "output": {
    ...config.output,
    "file": "dist/sagaGenesis.min.js"
  },
  "plugins": minifiedPlugins
}

export default [
  config,
  minifiedConfig
]

// console.log(config)
// console.log(minifiedConfig)

// [
//   "@babel/external-helpers"
// ],
// [
//   "@babel/transform-runtime"
// ],
