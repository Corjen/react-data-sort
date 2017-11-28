const rollupBabel = require('rollup-plugin-babel')

module.exports = {
  input: './src/index.js',
  output: [
    {
      file: './dist/index.cjs.js',
      format: 'cjs'
    },
    {
      file: './dist/index.esm.js',
      format: 'es'
    }
  ],
  exports: 'named',
  external: ['react', 'prop-types', 'lodash.sortby'],
  sourcemap: true,
  plugins: [
    rollupBabel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            targets: {
              browsers: ['ie 10', 'ios 7']
            },
            modules: false
          }
        ]
      ],
      plugins: ['transform-class-properties']
    })
  ]
}
