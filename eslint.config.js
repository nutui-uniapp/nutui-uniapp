import antfu from '@antfu/eslint-config'

export default antfu({
  overrides: {
    vue: {
      'vue/component-name-in-template-casing': ['off'],
    },
  },
})
