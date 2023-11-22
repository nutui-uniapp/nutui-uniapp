import path from 'node:path'
import fs from 'fs-extra'
import consloa from 'consola'

async function copy() {
  const sourceDir = 'packages/nutui'
  const destDir = 'dist'

  const excludedDir = [
    '_locale',
    'src',
    'node_modules',
    'build.config.ts',
    'env.d.ts',
    'tsconfig.json',
  ]

  await fs.remove(destDir)
  await fs.ensureDir(destDir)

  await fs.copy(sourceDir, destDir, {
    filter: (src) => {
      const baseName = path.basename(src)
      return ![...excludedDir].some(d => src.includes(d)) && baseName !== '__tests__'
    },
  })

  consloa.success('Copy success !!!')
}

copy()
