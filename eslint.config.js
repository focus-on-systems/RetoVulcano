// eslint.config.cjs
// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const jsdoc = require('eslint-plugin-jsdoc');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      jsdoc.configs['flat/recommended'],
    ],
    plugins: {
      jsdoc,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.spec.json'],
        tsconfigRootDir: __dirname,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      // prefer ts no-unused-vars
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-console': ['error', { allow: ['error'] }],
      // dead code
      'no-unreachable': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      // prefer unknown over any
      '@typescript-eslint/no-explicit-any': 'error',
      // allow eslint deactivation only with comment
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description',
          'ts-expect-error': 'allow-with-description',
        },
      ],
      '@typescript-eslint/no-empty-function': ['error', { allow: ['constructors'] }],
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/parameter-properties': 'error',
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: true,
          classes: false,
          variables: true,
          typedefs: true,
        },
      ],
      'max-lines': [
        'warn',
        {
          max: 750,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'max-lines-per-function': [
        'error',
        {
          max: 75,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'max-params': ['warn', 5],
      complexity: ['warn', 12],
      'max-depth': ['error', 5],
      // code format
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'brace-style': ['error', '1tbs', { allowSingleLine: false }],
      curly: ['error', 'all'],
      indent: 'off',
      // jsdoc
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: true,
          },
        },
      ],
      'jsdoc/require-returns': ['error', { checkConstructors: true }],
      'jsdoc/require-returns-type': 'error',
      'jsdoc/check-template-names': 'error',
      'jsdoc/check-indentation': 'off',
      'jsdoc/no-types': 'off',
      'jsdoc/require-description': ['error', { descriptionStyle: 'tag', contexts: ['any'] }],
      'jsdoc/require-description-complete-sentence': ['error', { tags: ['description'] }],
      'jsdoc/require-template': 'warn',
      'jsdoc/require-template-description': 'warn',
      'jsdoc/require-throws': 'warn',
      'jsdoc/require-throws-description': 'warn',
      'jsdoc/tag-lines': [
        'warn',
        'any',
        {
          startLines: 1,
          endLines: 0,
          applyToEndTag: false,
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
]);
