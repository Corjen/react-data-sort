module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'prettier'],
  plugins: ['react', 'import'],
  env: {
    browser: true,
    jest: true
  },
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
}
