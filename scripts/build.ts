import fs from 'fs-extra'

async function build() {
  const sourceDir = 'example/dist/build/h5'
  const destDir = 'docs/.vitepress/dist/ui'

  await fs.remove(destDir)
  await fs.ensureDir(destDir)

  await fs.copy(sourceDir, destDir)
}

build()
