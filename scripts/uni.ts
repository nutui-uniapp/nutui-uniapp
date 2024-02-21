import fs from 'fs-extra'
import consloa from 'consola'

async function copy() {
  const sourceDir = 'packages/nutui'
  const destDir = 'packages/uni_modules/dist/nutui-uni'

  await Promise.all([
    fs.remove('packages/uni_modules/dist'),
    fs.ensureDir(`${destDir}`),
  ])

  const excludedDir = [
    '_locale',
    'src',
    'node_modules',
    'build.config.ts',
    'env.d.ts',
    'tsconfig.json',
  ]

  const excludedDir2 = [
    'components',
    'locale',
    'dist',
    'styles',
    'global.d.ts',
  ]

  const excludedDir3 = [
    'README.md',
    'LICENSE',
  ]

  await Promise.all([
    fs.copy(sourceDir, destDir, {
      filter: src => ![...excludedDir, ...excludedDir2].some(d => src.includes(d)),
    }).then(() => {
      return Promise.all([
        fs.copy(sourceDir, `${destDir}`, {
          filter: src => ![...excludedDir, ...excludedDir3].some(d => src.includes(d)),
        }),
      ])
    }),

  ]).then(() => {
    consloa.success('copy success !!!')
  })
}

copy()
