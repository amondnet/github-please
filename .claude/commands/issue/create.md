---
description: Create a new GitHub issue interactively
allowed-tools:
  - Bash(gh issue create:*)
---

# Create New GitHub Issue

Create a new issue in a repository with title and description.

## Parameters
- `$1`: Issue title (required) OR Repository in format `owner/repo` 
- `$2`: Issue title (if $1 is repository)
- `$ARGUMENTS`: Full arguments including title, repository, and optional parameters

## Task
1. **Parse Repository and Title**
   - Check if `$1` contains `/` (repository format)
   - If `$1` is repository: use `$1` as repo, `$2` as title
   - If `$1` is not repository: use current repo, `$1` as title
   - Validate that title is provided

2. **Parse Additional Arguments**
   - Labels: `--label bug,enhancement`
   - Assignees: `--assignee username`
   - Body text: `--body "description"`
   - Template: `--template bug_report`
   - Repository: `--repo owner/name` (if not already set)

3. **Choose Creation Mode**
   - If no body is provided in arguments:
     - Open interactive mode: `gh issue create --repo ${repository} --title "${title}"`
     - This allows user to write description in their preferred editor
   
   - If body and other options are provided:
     - Create directly: `gh issue create --repo ${repository} --title "${title}" --body "${body}" [other-options]`

4. **After Creation**
   - Display the issue URL
   - Show issue number for future reference
   - Suggest using `/issue/analyze <number> [repo]` to review

## Examples
- `/issue/create "Fix login bug"` - Interactive creation with title
- `/issue/create "Add dark theme" --label enhancement --body "Users want dark mode option"`
- `/issue/create "Update docs" --assignee myusername --template documentation`

## Usage Notes
- Title is required and should be descriptive
- Use quotes for titles with spaces
- Interactive mode opens when only title is provided
- All GitHub CLI issue creation options are supported