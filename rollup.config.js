import json from "rollup-plugin-json"
import ascii from "rollup-plugin-ascii"
import resolve from "rollup-plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

import * as meta from "./package.json"

const copyright = `// ${meta.name} v${meta.version}
// Copyright ${(new Date).getFullYear()} ${meta.author}
// ${meta.homepage}
`

const config = {
  input: "src/index",
  plugins: [
    json(),
    resolve({
      extensions: [ '.js', '.jsx', '.json' ],
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    ascii(),
    commonjs()
  ],
  output: {
    extend: true,
    banner: copyright,
    file: "dist/sagaGenesis.js",
    format: "cjs",
    indent: false,
    name: "sagaGenesis",
    globals: {
      'debug': 'debug',
      'web3': 'Web3',
      'react': 'React',
      'react-redux': 'reactRedux',
      'redux-saga': 'reduxSaga',
      'ethjs-abi': 'abi',
      'prop-types': 'PropTypes',
      'bn.js': 'BN'
    }
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
