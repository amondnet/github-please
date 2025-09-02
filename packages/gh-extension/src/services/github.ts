import { execSync } from 'child_process'

export interface Issue {
  number: number
  title: string
  body: string
  author: string
  labels: string[]
  state: string
  created_at: string
}

export class GitHubService {
  private execGH(command: string): string {
    try {
      return execSync(`gh ${command}`, { 
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      }).trim()
    } catch (error) {
      if (error instanceof Error && 'stderr' in error) {
        const stderr = (error as any).stderr?.toString()
        throw new Error(`GitHub CLI error: ${stderr || error.message}`)
      }
      throw error
    }
  }
  
  async getCurrentRepo(): Promise<string | null> {
    try {
      const result = this.execGH('repo view --json nameWithOwner -q .nameWithOwner')
      return result || null
    } catch {
      return null
    }
  }
  
  async getIssue(repo: string, number: number): Promise<Issue> {
    const json = this.execGH(
      `issue view ${number} --repo ${repo} --json number,title,body,author,labels,state,createdAt`
    )
    
    const data = JSON.parse(json)
    
    return {
      number: data.number,
      title: data.title,
      body: data.body || '',
      author: data.author?.login || 'unknown',
      labels: data.labels?.map((l: any) => l.name) || [],
      state: data.state,
      created_at: data.createdAt
    }
  }
  
  async postComment(repo: string, issueNumber: number, body: string): Promise<void> {
    // Escape the body for shell execution
    const escapedBody = body.replace(/'/g, "'\"'\"'")
    
    this.execGH(
      `issue comment ${issueNumber} --repo ${repo} --body '${escapedBody}'`
    )
  }
  
  async listIssues(repo: string, options?: { 
    state?: 'open' | 'closed' | 'all'
    limit?: number 
  }): Promise<Issue[]> {
    const state = options?.state || 'open'
    const limit = options?.limit || 30
    
    const json = this.execGH(
      `issue list --repo ${repo} --state ${state} --limit ${limit} --json number,title,body,author,labels,state,createdAt`
    )
    
    const data = JSON.parse(json)
    
    return data.map((item: any) => ({
      number: item.number,
      title: item.title,
      body: item.body || '',
      author: item.author?.login || 'unknown',
      labels: item.labels?.map((l: any) => l.name) || [],
      state: item.state,
      created_at: item.createdAt
    }))
  }
}