import perfectionistPlugin from 'eslint-plugin-perfectionist';
import stylisticJsPlugin from '@stylistic/eslint-plugin-js';
import prettierPlugin from 'eslint-plugin-prettier';
import jsPlugin from '@eslint/js';
import globals from 'globals';

export default [
  jsPlugin.configs.recommended,
  perfectionistPlugin.configs['recommended-line-length'],
  {
    rules: {
      'stylistic/padding-line-between-statements': [
        'error',
        // В будущем заменить правила для 'import' на eslint-plugin-import.
        // Сейчас eslint-plugin-import не работает на ESLint 9.
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', next: 'import', prev: 'import' },
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', next: 'block-like', prev: '*' },
        { blankLine: 'always', prev: 'export', next: '*' },
        { blankLine: 'always', next: 'export', prev: '*' },
        { prev: 'singleline-const', blankLine: 'always', next: '*' },
        { prev: 'singleline-let', blankLine: 'always', next: '*' },
        { next: 'singleline-const', blankLine: 'always', prev: '*' },
        { next: 'singleline-let', blankLine: 'always', prev: '*' },
        { next: 'singleline-let', prev: 'singleline-let', blankLine: 'any' },
        {
          next: 'singleline-const',
          prev: 'singleline-const',
          blankLine: 'any',
        },
      ],
      'no-promise-executor-return': 'error',
      'perfectionist/sort-classes': 'off',
      'array-callback-return': 'error',
      'no-unused-expressions': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-destructuring': 'error',
      'consistent-return': 'error',
      'prettier/prettier': 'error',
      'arrow-body-style': 'error',
      'no-await-in-loop': 'error',
      'no-extend-native': 'error',
      'no-return-assign': 'error',
      'no-throw-literal': 'error',
      'object-shorthand': 'error',
      'no-return-await': 'error',
      'prefer-template': 'error',
      'accessor-pairs': 'error',
      'no-else-return': 'error',
      'no-lone-blocks': 'error',
      'require-await': 'error',
      'dot-notation': 'error',
      'no-multi-str': 'error',
      'prefer-const': 'error',
      'no-console': 'error',
      'camelcase': 'error',
      'no-proto': 'error',
      'curly': 'error',
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2025,
        ...globals.jest,
      },
    },
    plugins: {
      stylistic: stylisticJsPlugin,
      prettier: prettierPlugin,
    },
    files: ['**/*.js'],
  },
  {
    ignores: ['dist', 'node_modules'],
  },
];
