module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'global-require' : 'off',
    'react/jsx-filename-extension' : 'off',
    'import/no-extraneous-dependencies' : 'off',
    'no-restricted-syntax' : 'off',
    'guard-for-in' : 'off',
    'no-await-in-loop' : 'off',
    'react/jsx-no-useless-fragment' : 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props' : 'off',
    'react/no-array-index-key' : 'off',
    'react/prop-types' : 'off',
    'no-alert' : 'off',
    'react/no-unstable-nested-components' : 'off',
    'react/no-unescaped-entities' : 'off',
    'no-console' : 'off',
    'no-shadow' : 'off'
  },
};
