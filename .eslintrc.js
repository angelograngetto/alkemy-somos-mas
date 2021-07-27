module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          singleQuote: true,
          trailingComma: 'all',
          semi: true,
          endOfLine: 'auto',
          bracketSpacing: true,
          arrowParens: 'always',
        },
      ],
      'react/prop-types': 0,
      'no-console': 'warn',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
    },
  };