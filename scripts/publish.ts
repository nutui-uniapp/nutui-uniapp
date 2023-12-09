import { execSync } from 'node:child_process'
import { consola } from 'consola'
import { version } from '../package.json'

execSync('npm run build:all', { stdio: 'inherit' })

execSync('cd packages/nutui/', { stdio: 'inherit' })

const command = 'npm publish --access public'

execSync(command, { stdio: 'inherit' })

consola.success(`Published npm package version ${version}`)
