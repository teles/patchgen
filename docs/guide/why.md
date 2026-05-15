# Why patchgen?

## The Problem

Generating Git patch files requires remembering specific commands and flags:

```bash
# Staged changes
git diff --cached > my-changes.patch

# Branch comparison
git format-patch main..feat/login --stdout > branch-diff.patch

# Tag comparison
git format-patch v1.0.0..v1.1.0 --stdout > release-diff.patch

# Specific files only
git diff --cached -- src/auth.ts src/utils.ts > selected.patch
```

Each flow has different syntax. You have to remember which command to use, how to specify refs, and how to filter files. It's easy to get wrong, especially when switching between staged, branch-compare, and tag-compare workflows.

## The Solution

`patchgen` replaces all of that with one command:

```bash
npx patchgen
```

The interactive CLI guides you through the entire process — no flags to memorize, no syntax to look up.

## Key Benefits

### No Command Memorization

Instead of remembering `git diff --cached`, `git format-patch`, and their various flags, you just answer prompts:

- What type of patch? (staged, branch comparison, or tag comparison)
- Which refs? (branches or tags, depending on the mode)
- Which files to include? (all or select specific ones)
- What should the output file be called?

### Consistent Output

Every patch file follows a predictable flow:

1. Detect changes
2. Choose scope
3. Review summary
4. Generate and save

No more accidentally forgetting `--stdout` or using the wrong branch order.

### File Selection

Every patch mode supports choosing specific files. In staged mode, you see all staged files. In branch compare mode, you see all files that differ between the two branches. In tag compare mode, you see all files that changed between the two tags. Pick exactly what you need.

### AI-Friendly Format

Patch files are a practical way to share code changes with LLMs and AI assistants. Instead of pasting raw diffs or multiple files, a single `.patch` file gives the model a structured, complete picture of what changed — making it easier to get accurate reviews, suggestions, or explanations.

### Safe by Default

`patchgen` asks for confirmation before generating and warns you before overwriting existing files. You always see a summary of what will happen before anything is written to disk.

## Design Principles

### Interactive-First

The CLI is designed for humans at a terminal. Every step is guided with clear prompts and context. No hidden behaviors.

### Minimal Configuration

Zero config required. Run `npx patchgen` and you're ready. No config files, no setup, no dependencies beyond Node.js and Git.

### Composable Core

Under the hood, patchgen is built from small, focused, testable functions:

- **Patch rules** define how each mode works
- **Git commands** are built from parameters, not string concatenation
- **Summaries** are generated from structured data
- **File selection** is a composable step in every flow

This makes the codebase easy to extend with new patch modes in the future.
