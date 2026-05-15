# Getting Started

## Installation

You can run `patchgen` without installing using `npx`:

```bash
npx patchgen
```

Or install it globally:

::: code-group

```bash [npm]
npm install -g patchgen
```

```bash [pnpm]
pnpm add -g patchgen
```

```bash [yarn]
yarn global add patchgen
```

:::

## Requirements

- **Git** — patchgen runs git commands under the hood
- **Node.js 18+** — required runtime

## Your First Patch

Run `patchgen` inside any Git repository:

```bash
npx patchgen
```

The CLI will guide you through:

1. **Select patch type** — staged changes, branch comparison, or tag comparison
2. **Choose files** — include all or select specific files
3. **Name the output** — set the `.patch` file name
4. **Review summary** — confirm before generating
5. **Done** — patch file saved to your working directory

## Example: Staged Changes

Stage some files and run patchgen:

```bash
git add src/feature.ts
npx patchgen
```

```
◆ patchgen — Generate .patch files from your git repository
✔ Git repository detected.

◆ Select patch type:
● Staged changes — Generate a patch from staged files
○ Compare branches — ...
○ Compare tags — ...

◆ Which files to include?
● Include all files
○ Select files to include

◆ Output file name: › staged.patch

┌ Summary
│ Patch type: Staged changes
│ Output file: staged.patch
└

✔ Generate patch? Yes

✔ Collecting staged changes...
✔ Done.
✔ Writing file...
✔ Patch saved to staged.patch

◆ All done!
```

## Example: Compare Branches

Generate a patch with the differences between two branches:

```bash
npx patchgen
```

```
◆ Select patch type:
○ Staged changes
● Compare branches — Generate a patch from commits in a feature branch not present in a base branch
○ Compare tags

◆ Base branch: › main
◆ Feature branch: › feat/login

◆ Which files to include?
● Include all files

◆ Output file name: › main-feat-login.patch

┌ Summary
│ Patch type: Compare branches
│ Base branch: main
│ Feature branch: feat/login
│ Output file: main-feat-login.patch
└

✔ Generate patch? Yes
✔ Patch saved to main-feat-login.patch

◆ All done!
```

## Example: Compare Tags

Generate a patch with the differences between two release tags:

```bash
npx patchgen
```

```
◆ Select patch type:
○ Staged changes
○ Compare branches
● Compare tags — Generate a patch from commits between two tags, useful for release notes

◆ From tag: › v1.0.0
◆ To tag: › v1.1.0

◆ Which files to include?
● Include all files

◆ Output file name: › v1.0.0-v1.1.0.patch

┌ Summary
│ Patch type: Compare tags
│ From tag: v1.0.0
│ To tag: v1.1.0
│ Output file: v1.0.0-v1.1.0.patch
└

✔ Generate patch? Yes
✔ Patch saved to v1.0.0-v1.1.0.patch

◆ All done!
```

## What's Next?

- Learn about [Staged Changes](/use-cases/staged-changes) in detail
- Explore [Branch Comparison](/use-cases/compare-branches) workflows
- Compare [release tags](/use-cases/compare-tags) for release notes
- See how [File Selection](/use-cases/file-selection) works
- Discover how to [share patches with AI](/use-cases/sharing-with-ai)
