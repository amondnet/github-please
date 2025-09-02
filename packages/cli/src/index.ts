import { program } from 'commander'
import packageJson from '../package.json'

program
  .name('github-please')
  .description('AI-powered GitHub automation tool that handles issues, labels, and releases with a simple \"please\"')
  .version(packageJson.version)



program.parse()
