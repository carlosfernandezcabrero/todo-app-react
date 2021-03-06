module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:cypress/recommended',
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-implicit-globals': 'error'
  }
}
