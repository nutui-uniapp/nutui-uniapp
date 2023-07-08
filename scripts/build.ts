import fs from 'fs-extra'

fs.removeSync('docs/.vitepress/dist/ui')
fs.ensureDirSync('docs/.vitepress/dist/ui')

fs.copySync('example/dist/build/h5', 'docs/.vitepress/dist/ui')
