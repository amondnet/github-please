import chalk from 'chalk'
import ora from 'ora'
import { GitHubService } from '../services/github.js'
import { AIService } from '../services/ai.js'

interface RespondOptions {
  issue: string
  language: string
  template?: string
  repo?: string
  dryRun?: boolean
}

export async function respondCommand(options: RespondOptions) {
  const spinner = ora()
  
  try {
    // Get repository info
    const github = new GitHubService()
    const repo = options.repo || await github.getCurrentRepo()
    
    if (!repo) {
      console.error(chalk.red('Error: Could not determine repository. Use --repo flag or run from a git repository.'))
      process.exit(1)
    }
    
    console.log(chalk.cyan(`Repository: ${repo}`))
    console.log(chalk.cyan(`Issue: #${options.issue}`))
    
    // Fetch issue details
    spinner.start('Fetching issue details...')
    const issue = await github.getIssue(repo, parseInt(options.issue))
    spinner.succeed('Issue details fetched')
    
    console.log(chalk.gray(`Title: ${issue.title}`))
    console.log(chalk.gray(`Author: @${issue.author}`))
    
    // Generate AI response
    spinner.start('Generating AI response...')
    const ai = new AIService()
    const response = await ai.generateResponse({
      issue,
      language: options.language,
      template: options.template
    })
    spinner.succeed('Response generated')
    
    // Display the response
    console.log(chalk.green('\n--- Generated Response ---'))
    console.log(response)
    console.log(chalk.green('--- End of Response ---\n'))
    
    // Post the response if not dry-run
    if (!options.dryRun) {
      spinner.start('Posting response to issue...')
      await github.postComment(repo, parseInt(options.issue), response)
      spinner.succeed('Response posted successfully!')
      console.log(chalk.green(`✅ View at: https://github.com/${repo}/issues/${options.issue}`))
    } else {
      console.log(chalk.yellow('🔍 Dry run mode - response not posted'))
    }
    
  } catch (error) {
    spinner.fail('Operation failed')
    console.error(chalk.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`))
    process.exit(1)
  }
}