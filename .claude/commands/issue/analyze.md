---
description: Analyze a GitHub issue in the current repository
allowed-tools:
  - Bash(gh issue view:*)
  - Bash(gh api:*)
---

# Analyze GitHub Issue

Analyze issue #$1 and provide insights.

## Parameters
- `$1`: Issue number (required)
- `$2`: Repository in format `owner/repo` (optional, uses current repo if not specified)

## Task
1. **Determine Repository**
   - Use `$2` if provided, otherwise use current repository
   
2. **Fetch Issue Details**
   - Use `gh issue view $1 --repo ${repository} --json title,body,author,labels,assignees,state,comments,createdAt,updatedAt`

3. **Analyze Issue Content**
   Analyze the issue content including:
   - Issue title and description
   - Author and assignees
   - Labels and their implications
   - Comment history and discussion points
   - Timeline and urgency indicators

4. **Provide Comprehensive Analysis**
   - **Summary**: Brief overview of the issue
   - **Type**: Bug report, feature request, question, etc.
   - **Priority**: Based on labels and content
   - **Key Points**: Main discussion topics
   - **Suggested Response Strategy**: How to approach responding
   - **Related Context**: Any mentioned PRs, issues, or documentation

5. **Follow-up Suggestions**
   - If the issue is complex, suggest follow-up actions or clarifications needed.

## Examples
- `/issue/analyze 123` - Analyze issue #123 in current repository
- `/issue/analyze 456 facebook/react` - Analyze issue #456 in facebook/react repository

Remember to format the output clearly for command-line display.