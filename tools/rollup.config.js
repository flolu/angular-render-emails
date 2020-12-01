const node = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

module.exports = {
  plugins: [
    node({
      mainFields: ['browser', 'es2015', 'module', 'jsnext:main', 'main'],
    }),
    commonjs(),
  ],

  // hide this is undefined warning
  onwarn: function (warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    console.warn(warning.message);
  },

  // hide warning about empty facade chunk
  preserveEntrySignatures: 'strict'
}
