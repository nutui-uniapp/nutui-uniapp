import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: {
    overrides: {
      'ts/no-unused-expressions': 'off',
    },
  },
  markdown: false,
  vue: {
    overrides: {
      'vue/component-name-in-template-casing': ['off'],
      'vue/define-macros-order': ['off'],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': [
        2,
        {
          multiline: 1,
          singleline: 3,
        },
      ],
    },
  },
  regexp: {
    overrides: {
      'regexp/no-unused-capturing-group': 'off',
      'regexp/strict': 'off',
      'regexp/no-obscure-range': 'off',
    },
  },
  ignores: [
    'packages/nutui/styles/**/*',
    'packages/nutui/attributes.json',
    'packages/nutui/tags.json',
    'packages/nutui/web-types.json',
    'docs/dev-dist/**',
    'example/src/manifest.json',
    'example/src/pages.json',
  ],
}, {
  rules: {
    'unicorn/consistent-function-scoping': ['off'],
    'perfectionist/sort-imports': ['error', {
      internalPattern: ['^@/.*'],
      newlinesBetween: 'never',
      groups: [
        ['builtin-type', 'builtin'],
        ['external-type', 'external'],
        ['parent-type', 'parent'],
        ['sibling-type', 'sibling'],
        ['index-type', 'index'],
        ['internal-type', 'internal'],
        'style',
        ['side-effect', 'side-effect-style'],
        'object',
        'unknown',
      ],
    }],
    'antfu/consistent-chaining': ['off'],
  },
})
