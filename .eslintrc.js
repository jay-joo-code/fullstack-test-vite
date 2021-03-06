module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-use-before-define': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-use-before-define': ['off'],
    'comma-dangle': ['warn', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    'import/no-named-default': 'off',
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-max-props-per-line': ['warn', { maximum: 1 }],
    'react/jsx-first-prop-new-line': ['warn', 'multiline-multiprop'],
    'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
    'react/jsx-closing-tag-location': 'warn',
    'react/jsx-indent': ['warn', 2],
    quotes: ['warn', 'single'],
    'jsx-quotes': ['warn', 'prefer-single'],
    indent: 'off',
    '@typescript-eslint/indent': ['warn', 2],
  },
}
