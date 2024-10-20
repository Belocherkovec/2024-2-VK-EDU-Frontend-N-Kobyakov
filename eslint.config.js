import js from '@eslint/js';
import stylisticJsPlugin from '@stylistic/eslint-plugin-js';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      perfectionistPlugin.configs['recommended-natural'],
    ],
    files: ['**/*.{js,ts}?(x)'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2025,
        ...globals.jest,
      },
    },
    plugins: {
      'prettier': prettierPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'stylistic': stylisticJsPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'accessor-pairs': 'error',
      'array-callback-return': 'error',
      'arrow-body-style': 'error',
      'camelcase': 'error',
      'consistent-return': 'error',
      'curly': 'error',
      'dot-notation': 'error',
      'no-await-in-loop': 'error',
      'no-console': 'error',
      'no-else-return': 'error',
      'no-extend-native': 'error',
      'no-lone-blocks': 'error',
      'no-multi-str': 'error',
      'no-promise-executor-return': 'error',
      'no-proto': 'error',
      'no-return-assign': 'error',
      'no-return-await': 'error',
      'no-throw-literal': 'error',
      'no-unused-expressions': 'error',
      'object-shorthand': 'error',
      'perfectionist/sort-classes': 'off',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': 'error',
      'prefer-template': 'error',
      'prettier/prettier': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'require-await': 'error',
      'stylistic/padding-line-between-statements': [
        'error',
        // В будущем заменить правила для 'import' на eslint-plugin-import.
        { blankLine: 'always', next: '*', prev: 'import' },
        { blankLine: 'any', next: 'import', prev: 'import' },
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'block-like' },
        { blankLine: 'always', next: 'block-like', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'export' },
        { blankLine: 'always', next: 'export', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'singleline-const' },
        { blankLine: 'always', next: '*', prev: 'singleline-let' },
        { blankLine: 'always', next: 'singleline-const', prev: '*' },
        { blankLine: 'always', next: 'singleline-let', prev: '*' },
        { blankLine: 'any', next: 'singleline-let', prev: 'singleline-let' },
        {
          blankLine: 'any',
          next: 'singleline-const',
          prev: 'singleline-const',
        },
      ],
    },
  },
);
