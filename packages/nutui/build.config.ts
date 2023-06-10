import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [{
    builder: 'rollup',
    input: 'src/index',
  },
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  externals: ['vue', '@uni-helper/vite-plugin-uni-components'],
})
