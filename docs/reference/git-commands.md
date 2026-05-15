# Git Commands

Reference for the Git commands that patchgen executes under the hood.

## Staged Changes

### All Files

```bash
git diff --cached
```

Captures the diff of everything in the staging area.

### Selected Files

```bash
git diff --cached -- file1.ts file2.ts
```

Captures the diff of only the specified staged files.

### Listing Staged Files

To show the file selection list, patchgen first runs:

```bash
git diff --cached --name-only
```

## Branch Comparison

### All Files (format-patch)

```bash
git format-patch <base>..<feature> --stdout
```

Example:

```bash
git format-patch main..feat/login --stdout
```

This preserves individual commit messages, authorship, and dates in the patch output.

### Selected Files (diff)

```bash
git diff <base>..<feature> -- file1.ts file2.ts
```

Example:

```bash
git diff main..feat/login -- src/auth/login.ts src/auth/utils.ts
```

::: info Why `git diff` instead of `git format-patch`?
`git format-patch` does not support filtering by file paths. When you select specific files, patchgen falls back to `git diff`, which can filter by path but does not include commit messages.
:::

### Listing Changed Files

To show the file selection list, patchgen runs:

```bash
git diff --name-only <base>..<feature>
```

## Tag Comparison

### All Files (format-patch)

```bash
git format-patch <from-tag>..<to-tag> --stdout
```

Example:

```bash
git format-patch v1.0.0..v1.1.0 --stdout
```

This preserves individual commit messages, authorship, and dates in the patch output.

### Selected Files (diff)

```bash
git diff <from-tag>..<to-tag> -- file1.ts file2.ts
```

Example:

```bash
git diff v1.0.0..v1.1.0 -- src/auth/login.ts src/auth/utils.ts
```

As with branch comparison, selecting files uses `git diff`, which can filter by path but does not include commit messages.

### Listing Changed Files

To show the file selection list, patchgen runs:

```bash
git diff --name-only <from-tag>..<to-tag>
```

## Other Git Commands

### Repository Detection

```bash
git rev-parse --is-inside-work-tree
```

Returns `true` if the current directory is inside a Git repository.

### Default Branch Detection

```bash
git symbolic-ref refs/remotes/origin/HEAD
```

Extracts the default branch name (e.g., `main` or `master`) from the remote HEAD reference.

### Current Branch

```bash
git branch --show-current
```

Returns the name of the currently checked-out branch.

## Command Building

patchgen builds all Git commands as structured objects (command + args), never as concatenated strings. This ensures:

- No shell injection issues
- Correct handling of branch and tag names with special characters
- Predictable, testable command construction

Example internal representation:

```typescript
{
  command: 'git',
  args: ['diff', '--cached', '--', 'src/auth/login.ts', 'src/auth/utils.ts']
}
```

Commands are executed using [execa](https://github.com/sindresorhus/execa), which spawns processes without a shell by default.
