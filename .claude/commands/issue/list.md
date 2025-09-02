---
description: List GitHub issues with optional filters
allowed-tools:
  - Bash(gh issue list:*)
---

# List GitHub Issues

List issues in a repository with optional filters.

## Parameters
- `$1`: Repository in format `owner/repo` (optional, uses current repo if not specified)
- Additional arguments: `$ARGUMENTS` (e.g., "open bug", "closed", "author:username")

## Task
1. **Determine Repository**
   - Check if `$1` is a repository (contains `/`) or a filter argument
   - Set repository: use `$1` if it's a repo format, otherwise use current repository
   - Adjust remaining arguments accordingly

2. **Parse Filter Arguments**
   - State: open (default), closed, all
   - Labels: bug, enhancement, documentation, etc.
   - Author: filter by issue author
   - Assignee: filter by assignee

3. **Build and Execute Command**
   - Base command: `gh issue list --repo ${repository} --limit 20`
   - Add filters as needed:
     - `--state <state>`
     - `--label <label>`
     - `--author <author>`
     - `--assignee <assignee>`

4. **Display Results**
   Display the results in a clear table format showing:
   - Issue number
   - Title
   - Labels
   - Author
   - Updated time
   - State (if showing all)

5. **Provide Summary**
   - Total issues shown
   - Repository and filters applied
   - Suggestion to use `/issue/analyze <number> [repo]` for detailed analysis

## Examples
- `/issue/list` - Show recent open issues in current repository
- `/issue/list facebook/react` - Show recent open issues in facebook/react
- `/issue/list facebook/react closed` - Show closed issues in facebook/react
- `/issue/list bug` - Show issues labeled as bugs in current repository
- `/issue/list microsoft/vscode author:octocat` - Show issues by specific author in vscode