---
description: Generate a response draft for a GitHub issue
allowed-tools:
  - Bash(gh issue view:*)
  - Bash(gh api:*)
---

# Generate Issue Response Draft

Generate a thoughtful response to GitHub issue #$1 without posting it.

## Parameters
- `$1`: Issue number (required)
- `$2`: Repository in format `owner/repo` (optional, uses current repo if not specified)

## Task
1. **Fetch Issue Details**
   - Determine repository: use `$2` if provided, otherwise current repository
   - Use `gh issue view $1 --repo ${repository} --json title,body,author,labels,assignees,state,comments,createdAt,updatedAt,url`
   - Get the complete issue context including all comments

2. **Analyze Issue Content**
   - Identify the issue type: bug report, feature request, question, documentation, etc.
   - Extract key information: problem description, expected vs actual behavior, environment details
   - Review existing comments and previous discussions
   - Check labels for priority and category information

3. **Generate Response Strategy**
   Based on the issue type, create an appropriate response:
   
   **For Bug Reports:**
   - Acknowledge the issue
   - Ask for clarification if details are missing
   - Suggest debugging steps or workarounds
   - Indicate if this is a known issue or duplicate
   
   **For Feature Requests:**
   - Acknowledge the suggestion
   - Discuss feasibility and implementation considerations
   - Ask for use cases or additional requirements
   - Suggest alternatives if applicable
   
   **For Questions:**
   - Provide helpful answers or guidance
   - Point to relevant documentation
   - Suggest community resources
   - Offer to clarify if more info needed

4. **Draft Response**
   Create a professional, helpful response that:
   - Uses a friendly but professional tone
   - Addresses the user by name (if available)
   - Directly addresses their concern
   - Provides actionable next steps
   - Includes relevant links or references when helpful

5. **Review and Present**
   - Show the generated response clearly formatted
   - Provide suggestions for customization
   - Note: This is a DRAFT - review before posting manually
   - Suggest using `/please/issue/respond $1` for AI-powered posting

Remember: This command only generates a draft response for review, it does NOT post to GitHub.