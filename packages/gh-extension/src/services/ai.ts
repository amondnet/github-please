import { Issue } from './github.js'

interface GenerateResponseOptions {
  issue: Issue
  language: string
  template?: string
}

export class AIService {
  private apiKey: string | undefined
  
  constructor() {
    // Try to get API key from environment
    this.apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY
  }
  
  async generateResponse(options: GenerateResponseOptions): Promise<string> {
    const { issue, language, template } = options
    
    // For now, we'll use a mock response with templates
    // In production, this would call the Claude API
    
    if (!this.apiKey) {
      return this.generateMockResponse(issue, language, template)
    }
    
    // TODO: Implement actual Claude API call
    // For now, returning mock response
    return this.generateMockResponse(issue, language, template)
  }
  
  private generateMockResponse(issue: Issue, language: string, template?: string): string {
    const templates: Record<string, (issue: Issue) => string> = {
      bug: (issue) => `Thank you for reporting this issue! 🐛

I've reviewed your bug report regarding "${issue.title}". This appears to be a valid concern that needs investigation.

**Next Steps:**
1. I'll investigate the root cause
2. Prepare a fix if confirmed
3. Update you on the progress

If you have any additional information or can provide steps to reproduce, please feel free to add them.

Thank you for helping improve this project!`,
      
      feature: (issue) => `Thank you for your feature request! ✨

Your suggestion for "${issue.title}" is interesting and could enhance the project.

**Evaluation Criteria:**
- Use case clarity
- Impact on existing functionality
- Implementation complexity
- Community demand

I'll review this request and consider it for future releases. Community feedback (+1 reactions) helps prioritize features.

Feel free to provide more details about your use case!`,
      
      question: (issue) => `Hi @${issue.author}! 👋

Thanks for your question about "${issue.title}".

Based on your description, here's what I understand you're asking about. Let me provide some guidance:

1. First, check our documentation for similar topics
2. You might find the answer in our FAQ section
3. Feel free to join our community discussions for more help

If you need more specific help, please provide additional context about:
- What you've already tried
- Your environment/setup
- Expected vs actual behavior

Happy to help further!`,
      
      default: (issue) => `Thank you for opening this issue! 📝

I've noted your report about "${issue.title}". 

I'll review this and get back to you soon. In the meantime, please feel free to add any additional context that might be helpful.

Thank you for contributing to this project!`
    }
    
    // Language-specific responses (simplified example)
    if (language === 'ko') {
      return `안녕하세요 @${issue.author}님! 👋

"${issue.title}"에 대한 이슈를 열어주셔서 감사합니다.

이 내용을 검토하고 곧 답변드리겠습니다. 추가로 도움이 될만한 정보가 있다면 언제든지 알려주세요.

프로젝트에 기여해주셔서 감사합니다!`
    }
    
    if (language === 'ja') {
      return `こんにちは @${issue.author}さん! 👋

「${issue.title}」についてのイシューを開いていただき、ありがとうございます。

内容を確認し、近日中に返信いたします。追加情報がございましたら、お気軽にお知らせください。

プロジェクトへの貢献に感謝いたします！`
    }
    
    // Determine template based on labels or keywords
    let selectedTemplate = template || 'default'
    
    if (!template) {
      const lowerTitle = issue.title.toLowerCase()
      const lowerBody = issue.body.toLowerCase()
      const hasLabel = (label: string) => issue.labels.some(l => l.toLowerCase().includes(label))
      
      if (hasLabel('bug') || lowerTitle.includes('bug') || lowerTitle.includes('error')) {
        selectedTemplate = 'bug'
      } else if (hasLabel('feature') || hasLabel('enhancement') || lowerTitle.includes('feature')) {
        selectedTemplate = 'feature'
      } else if (hasLabel('question') || lowerTitle.includes('how') || lowerTitle.includes('?')) {
        selectedTemplate = 'question'
      }
    }
    
    const templateFunc = templates[selectedTemplate] || templates.default
    return templateFunc(issue)
  }
  
  async generateResponseWithClaude(options: GenerateResponseOptions): Promise<string> {
    if (!this.apiKey) {
      throw new Error('ANTHROPIC_API_KEY or CLAUDE_API_KEY environment variable is required')
    }
    
    const { issue, language } = options
    
    const systemPrompt = `You are a helpful GitHub issue responder for an open-source project. 
Respond professionally and helpfully to issues.
Language: ${language}
Be concise but thorough. Show appreciation for the contribution.`
    
    const userPrompt = `Please respond to this GitHub issue:
Title: ${issue.title}
Author: @${issue.author}
Labels: ${issue.labels.join(', ') || 'none'}
Body: ${issue.body}

Generate an appropriate response.`
    
    // TODO: Implement actual API call to Claude
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    })
    
    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data.content[0].text
  }
}