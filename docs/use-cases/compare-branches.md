# Compare Branches

Generate a `.patch` file from the diff between a base branch and a feature branch.

## How It Works

When you select **Compare branches**, patchgen asks for two branches:

- **Base branch** — the branch you're comparing against (e.g., `main`)
- **Feature branch** — the branch with your changes (e.g., `feat/login`)

### With All Files

When including all files, patchgen uses `git format-patch` to preserve commit messages:

```bash
git format-patch main..feat/login --stdout
```

### With Selected Files

When selecting specific files, patchgen switches to `git diff` (commit messages are not available):

```bash
git diff main..feat/login -- file1.ts file2.ts
```

::: warning
When using **Select files to include** in branch compare mode, commit messages will not be included in the patch. This is because `git diff` is used instead of `git format-patch`.
:::

## When to Use

- You want to capture all changes between two branches
- You need a patch for code review or to share with teammates
- You're preparing changes to apply to another repository

## Full Example

```bash
npx patchgen
```

```
◆ patchgen — Generate .patch files from your git repository
✔ Git repository detected.

◆ Select patch type:
○ Staged changes — ...
● Compare branches — Generate a patch from commits in a feature branch not present in a base branch

◆ Base branch: › main
◆ Feature branch: › feat/login

◆ Which files to include?
● Include all files
○ Select files to include

◆ Output file name: › main-feat-login.patch

┌ Summary
│ Patch type: Compare branches
│ Base branch: main
│ Feature branch: feat/login
│ Output file: main-feat-login.patch
└

✔ Generate patch? Yes

✔ Generating patch...
✔ Done.
✔ Writing file...
✔ Patch saved to main-feat-login.patch

◆ All done!
```

## Default File Name

The default output file name is derived from both branch names:

```
{base}-{feature}.patch
```

For example, comparing `main` with `feat/login` produces:

```
main-feat-login.patch
```

Special characters like `/` are replaced with `-` to create a valid file name.

## Branch Suggestions

patchgen tries to suggest sensible defaults:

- **Base branch** — detects the default branch of the repository (usually `main` or `master`)
- **Feature branch** — uses the currently checked-out branch

You can accept the suggestions or type different branch names.

## Applying the Patch

### From `format-patch` (all files)

```bash
# Apply preserving commits
git am main-feat-login.patch

# Or apply as a single diff
git apply main-feat-login.patch
```

### From `diff` (selected files)

```bash
git apply main-feat-login.patch
```

::: tip
Patches generated with `git format-patch` (all files) preserve commit history and can be applied with `git am`. Patches generated with `git diff` (selected files) can only be applied with `git apply`.
:::
