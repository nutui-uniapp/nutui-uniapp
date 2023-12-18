import { execSync } from 'node:child_process'
import { consola } from 'consola'
import { version } from '../package.json'

execSync('npm run build:all', { stdio: 'inherit' })

const command = 'cd packages/nutui && npm publish'

execSync(command, { stdio: 'inherit' })

consola.success(`Published npm package version ${version}`)
