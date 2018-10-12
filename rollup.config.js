import ascii from "rollup-plugin-ascii"
import node from "rollup-plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import * as meta from "./package.json"
import babel from 'rollup-plugin-babel'

const copyright = `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name}`

export default [
  {
    input: "src/index",
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      node(),
      ascii()
    ],
    output: {
      extend: true,
      banner: copyright,
      file: "dist/sagaGenesis.js",
      format: "iife",
      indent: false,
      name: "sagaGenesis",
      globals: {
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
      'web3',
      'react',
      'react-redux',
      'redux-saga',
      'ethjs-abi',
      'prop-types',
      'bn.js'
    ]
  },
  {
    input: "src/index",
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      node(),
      ascii(),
      terser({ output: { preamble: copyright } })
    ],
    output: {
      extend: true,
      file: "dist/sagaGenesis.min.js",
      format: "iife",
      indent: false,
      name: "sagaGenesis",
      globals: {
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
      'web3',
      'react',
      'react-redux',
      'redux-saga',
      'ethjs-abi',
      'prop-types',
      'bn.js'
    ]
  }
]
