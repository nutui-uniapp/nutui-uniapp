import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: {
    overrides: {
      'ts/no-unused-expressions': 'off',
    },
  },
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
  ],
})
