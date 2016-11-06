import rollup from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'tmp/main.js',
  dest: 'dist/build.js',
  sourceMap: true,
  format: 'iife',
  useStrict: false,
  treeshake: true,
  context: 'window',
  moduleName: 'tocu',
  plugins: [
    commonjs({
      include: [
        'node_modules/howler/dist/howler.js',
        // 'node_modules/web-animations-js/src/**',
        'node_modules/rxjs/**',
        'node_modules/firebase/**',
        'node_modules/angularfire2/**'
      ],
      namedExports: {
        'node_modules/firebase/firebase.js': ['initializeApp', 'auth', 'database'],
        'node_modules/angularfire2/node_modules/firebase/firebase-browser.js': ['initializeApp', 'auth', 'database']
      }
    }),
    nodeResolve({ jsnext: true, module: true, browser: true, main:true, extensions:['.js'] }),
    uglify()
  ]
}
