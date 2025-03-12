import globals from 'globals';
//
import jsLint from '@eslint/js';
import tsLint from 'typescript-eslint';
//
import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginGithub from 'eslint-plugin-github';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
//
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    // .eslintignore
    ignores: ['**/node_modules', '**/dist', '**/coverage', '**/*.json', 'eslint.config.mjs']
  },
  jsLint.configs.recommended, // eslint:recommended
  ...tsLint.configs.recommended, // plugin:@typescript-eslint/recommended
  eslintPluginGithub.getFlatConfigs().recommended, // plugin:github/recommended
  eslintPluginJest.configs['flat/recommended'], // plugin:jest/recommended
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  eslintPluginPrettierRecommended,
  {
    plugins: {
      '@typescript-eslint': tsLint.plugin, // @typescript-eslint/plugin
      jest: eslintPluginJest
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsLint.parser, // @typescript-eslint/parser
      parserOptions: {
        project: ['./.github/linters/tsconfig.json']
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
      'import/no-namespace': 'off'
    }
  },
  {
    rules: {
      'importPlugin/no-unresolved': 'off',
      camelcase: 'off',
      'i18n-text/no-en': 'off',
      'importPlugin/no-namespace': 'off',
      'no-console': 'warn',
      'eslint-comments/no-use': 'off'
    }
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off'
    }
  }
];
