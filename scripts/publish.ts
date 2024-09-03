import { execSync } from 'node:child_process'
import { consola } from 'consola'
import { version } from '../package.json'

function publish() {
  execSync('npm run build:all', { stdio: 'inherit' })

  execSync('cd packages/nutui && npm publish', { stdio: 'inherit' })

  consola.success(`Published npm package version ${version}`)
}

publish()
