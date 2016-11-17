import rollup from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'dist/main.bundle.js',
  dest: 'dist/main_rollup.js',
  sourceMap: true,
  format: 'iife',
  useStrict: false,
  treeshake: true,
  context: 'window',
  moduleName: 'tocu',
  plugins: [
    babel(),
    nodeResolve({ jsnext: true, module: true, browser: true, main:true, extensions:['.js'] }),
    uglify()
  ]
}
