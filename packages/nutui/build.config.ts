import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    {
      builder: 'rollup',
      input: './components/_locale/locale.ts',
      outDir: 'dist',
    },
  ],
  outDir: 'dist',
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  externals: ['vue', '@uni-helper/vite-plugin-uni-components'],
})
