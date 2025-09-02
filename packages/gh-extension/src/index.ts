import { program } from 'commander'
import { respondCommand } from './commands/respond.js'
import packageJson from '../package.json'

program
  .name('gh please')
  .description('AI-powered GitHub issue automation')
  .version(packageJson.version)

program
  .command('respond')
  .description('Generate and post AI-powered response to a GitHub issue')
  .requiredOption('-i, --issue <number>', 'Issue number to respond to')
  .option('-l, --language <lang>', 'Language for the response (e.g., en, ko, ja)', 'en')
  .option('-t, --template <name>', 'Response template to use')
  .option('-r, --repo <owner/name>', 'Repository (defaults to current repo)')
  .option('--dry-run', 'Preview response without posting')
  .action(respondCommand)

program.parse()