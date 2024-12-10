import js from '@eslint/js';
import globals from 'globals';
import stylisticJsPlugin from '@stylistic/eslint-plugin-js';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'prettier': prettierPlugin,
      'react': eslintReact,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'stylistic': stylisticJsPlugin
    }
  },
  {
    ignores: [
      'dist',
      'node_modules',
      'eslint.config.js',
      'vite.config.ts',
      'ts/**/*'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025,
        ...globals.jest
      },
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json']
      }
    }
  },
  {
    files: ['**/*.{js,ts}?(x)'],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
);
