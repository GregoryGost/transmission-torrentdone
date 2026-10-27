import globals from 'globals';
//
import jsLint from '@eslint/js';
import tsLint from 'typescript-eslint';
//
import eslintPluginJest from 'eslint-plugin-jest';
import { importX } from 'eslint-plugin-import-x';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
//
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    // Global ignores
    ignores: ['**/node_modules', '**/dist', '**/coverage', '**/*.json', 'eslint.config.ts']
  },
  jsLint.configs.recommended, // eslint:recommended
  ...tsLint.configs.recommended, // plugin:@typescript-eslint/recommended
  importX.flatConfigs.recommended,
  eslintPluginJest.configs['flat/recommended'], // plugin:jest/recommended
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  eslintPluginPrettierRecommended,
  {
    plugins: {
      '@typescript-eslint': tsLint.plugin,
      jest: eslintPluginJest
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsLint.parser,
      parserOptions: {
        project: ['./.github/linters/tsconfig.json', './tsconfig.json']
      },
      globals: {
        ...globals.node,
        ...globals.jest,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
      }
    }
  },
  {
    files: ['__tests__/**/*'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  {
    rules: {
      // TypeScript already checks module resolution and named imports.
      'import-x/no-unresolved': 'off',
      'import-x/named': 'off',
      'import-x/no-namespace': 'off',
      'import-x/first': 'error',
      'import-x/extensions': 'error',
      'import-x/no-absolute-path': 'error',
      'import-x/no-amd': 'error',
      'import-x/no-commonjs': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-dynamic-require': 'error',
      'import-x/no-mutable-exports': 'error',
      'import-x/no-webpack-loader-syntax': 'error',
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      camelcase: 'off',
      'no-console': 'warn'
    }
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off'
    }
  }
];
