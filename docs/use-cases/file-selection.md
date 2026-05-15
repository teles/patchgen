# File Selection

In every patch mode, patchgen lets you choose which files to include in the generated patch.

## Selection Modes

After choosing the patch type, you're asked:

```
◆ Which files to include?
● Include all files
○ Select files to include
```

### Include All Files

Uses every changed file. No additional prompts.

### Select Files to Include

Shows a multi-select list of all changed files:

```
◆ Select files to include:
◼ src/auth/login.ts
◼ src/auth/utils.ts
◻ src/config.ts
◻ tests/auth.test.ts
```

Use arrow keys to navigate and space to toggle. At least one file must be selected.

## How Files Are Detected

### Staged Changes

patchgen runs `git diff --cached --name-only` to list all staged files:

```bash
git diff --cached --name-only
```

### Branch Comparison

patchgen runs `git diff --name-only` between the two branches:

```bash
git diff --name-only main..feat/login
```

### Tag Comparison

patchgen runs `git diff --name-only` between the two tags:

```bash
git diff --name-only v1.0.0..v1.1.0
```

## Impact on Git Commands

File selection affects which git command is used to generate the patch:

### Staged Changes

| Selection    | Command                                     |
| ------------ | ------------------------------------------- |
| All files    | `git diff --cached`                         |
| Select files | `git diff --cached -- file1.ts file2.ts`    |

Both produce the same type of output — only the scope is different.

### Branch Comparison

| Selection    | Command                                              |
| ------------ | ---------------------------------------------------- |
| All files    | `git format-patch main..feat/login --stdout`         |
| Select files | `git diff main..feat/login -- file1.ts file2.ts`     |

### Tag Comparison

| Selection    | Command                                              |
| ------------ | ---------------------------------------------------- |
| All files    | `git format-patch v1.0.0..v1.1.0 --stdout`           |
| Select files | `git diff v1.0.0..v1.1.0 -- file1.ts file2.ts`       |

::: warning Important difference
When selecting files in **branch compare** or **tag compare** mode, patchgen uses `git diff` instead of `git format-patch`. This means **commit messages are not included** in the patch output.

A note is displayed in the CLI when this happens, and the summary shows "Commit messages not included".
:::

## Summary Display

When files are selected, the summary reflects the selection:

```
┌ Summary
│ Patch type: Compare branches
│ Base branch: main
│ Feature branch: feat/login
│ Files selected: 2 files
│ Note: Commit messages not included
│ Output file: main-feat-login.patch
└
```

Tag compare with selected files:

```
┌ Summary
│ Patch type: Compare tags
│ From tag: v1.0.0
│ To tag: v1.1.0
│ Files selected: 2 files
│ Note: Commit messages not included
│ Output file: v1.0.0-v1.1.0.patch
└
```

## Example: Staged with File Selection

```bash
git add src/auth/login.ts src/auth/utils.ts src/config.ts
npx patchgen
```

```
◆ Select patch type:
● Staged changes

◆ Which files to include?
○ Include all files
● Select files to include

◆ Select files to include:
◼ src/auth/login.ts
◼ src/auth/utils.ts
◻ src/config.ts

◆ Output file name: › staged.patch

┌ Summary
│ Patch type: Staged changes
│ Files selected: 2 files
│ Output file: staged.patch
└

✔ Generate patch? Yes
✔ Patch saved to staged.patch
```

## Example: Branch Compare with File Selection

```bash
npx patchgen
```

```
◆ Select patch type:
● Compare branches

◆ Base branch: › main
◆ Feature branch: › feat/login

◆ Which files to include?
● Select files to include

┌ Note
│ When selecting specific files in branch compare mode,
│ commit messages will not be included in the patch.
└

◆ Select files to include:
◼ src/auth/login.ts
◼ src/auth/utils.ts
◻ src/config.ts

◆ Output file name: › main-feat-login.patch

┌ Summary
│ Patch type: Compare branches
│ Base branch: main
│ Feature branch: feat/login
│ Files selected: 2 files
│ Note: Commit messages not included
│ Output file: main-feat-login.patch
└

✔ Generate patch? Yes
✔ Patch saved to main-feat-login.patch
```
