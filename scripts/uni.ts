import fs from 'fs-extra'
import consloa from 'consola'

async function buildUni() {
  const sourceDir = 'packages/nutui'
  const destDir = 'example/uni_modules/nutui-uni'

  try {
    consloa.info('开始构建')

    await fs.remove(destDir)
    await fs.ensureDir(destDir)

    consloa.success('目标路径已清空')

    consloa.info('开始复制')

    await fs.copy(sourceDir, destDir, {
      filter(src) {
        return !src.includes('node_modules')
      },
    })
    await fs.copyFile('CHANGELOG.md', `${destDir}/changelog.md`)
    await fs.copyFile('scripts/package.json', `${destDir}/package.json`)

    consloa.success('复制完成')

    await fs.createFile(`${destDir}/components/nutui-uni/nutui-uni.vue`)

    consloa.success('构建完成')
  }
  catch (error) {
    consloa.error('构建失败', error)
  }
}

buildUni()
