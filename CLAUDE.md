# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`GitHub Please` is an AI-powered GitHub automation tool that handles issues, labels, and releases. The project is in early development stage with planned features for multi-AI support, cloud service, and custom workflows.

## Architecture

This is a Turborepo-powered pnpm monorepo with the following structure:
- `packages/cli/` - Main CLI package using Commander.js
- `packages/gh-extension/` - GitHub CLI extension for issue automation
- `packages/eslint-config/` - Shared ESLint configuration
- `packages/tsconfig/` - Shared TypeScript configuration

## Development Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Development mode with watch (all packages)
pnpm dev

# Type checking (all packages)
pnpm typecheck

# Linting (all packages)
pnpm lint

# Package-specific commands
cd packages/cli && pnpm build
cd packages/gh-extension && pnpm build

# Install gh extension locally for testing
gh extension install ./packages/gh-extension
```

## GitHub CLI Extension

The `gh-extension` package provides a GitHub CLI extension that can be used with:
```bash
gh please respond --issue <number>  # Respond to an issue
gh please respond --issue <number> --language <lang>  # Respond in specific language
```

## Development Guidelines

This repository follows strict development practices outlined in AGENTS.md

@AGENTS.md
