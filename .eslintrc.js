module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-nested-ternary': 'off',
    'react/jsx-no-target-blank': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'max-len': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/button-has-type': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'object-curly-newline': 'off',
    'eslint-disable operator-linebreak': 'off',
    'react/no-array-index-key': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'react/jsx-no-bind': 'off',
    'no-param-reassign': 'off',
  },
};
