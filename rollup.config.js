import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/react-data-sort.tsx',
  output: [
    {
      file: './dist/react-data-sort.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: './dist/react-data-sort.esm.js',
      format: 'es',
      sourcemap: true
    }
  ],
  external: ['react', 'prop-types', 'lodash.sortby', 'match-sorter'],
  plugins: [typescript()]
}
