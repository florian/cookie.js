import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/cookie.js',
    output: {
      name: 'cookie',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs() // so Rollup can convert `ms` to an ES module
    ]
  },

  // CommonJS (for Node) build.
  {
    input: 'src/cookie.js',
    external: ['ms'],
    output: [
      { file: pkg.main, format: 'cjs' },
    ]
  },

  // ES module (for bundlers) build
  {
    input: 'src/esm.js',
    external: ['ms'],
    output: [
      { file: pkg.module, format: 'es' }
    ]
  },

  // browser-friendly UMD minified build
  {
    input: 'src/cookie.js',
    output: {
      name: 'cookie',
      file: 'dist/cookie.umd.min.js',
      format: 'umd',
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      terser() // mangler/compressor toolkit
    ]
  },
];
