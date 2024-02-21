import fs from 'fs-extra'
import consloa from 'consola'

async function copy() {
  const sourceDir = 'packages/nutui'
  const destDir = 'example/uni_modules/nutui-uni'

  try {
    await Promise.all([
      fs.remove(destDir),
      fs.ensureDir(destDir),
    ])

    await fs.copy(sourceDir, destDir)
    await fs.copyFile('CHANGELOG.md', `${destDir}/changelog.md`)
    await fs.copyFile('scripts/package.json', `${destDir}/package.json`)
    consloa.success('copy success !!!')
    fs.createFileSync(`${destDir}/components/nutui-uni/nutui-uni.vue`)
  }
  catch (error) {
    consloa.error('Copy failed:', error)
  }
}

copy()
