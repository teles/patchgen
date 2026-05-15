# Compare Tags

Generate a `.patch` file from the commits between two tags.

## How It Works

When you select **Compare tags**, patchgen asks for two tags:

- **From tag** — the older tag you're comparing from (e.g., `v1.0.0`)
- **To tag** — the newer tag you're comparing to (e.g., `v1.1.0`)

### With All Files

When including all files, patchgen uses `git format-patch` to preserve commit messages:

```bash
git format-patch v1.0.0..v1.1.0 --stdout
```

### With Selected Files

When selecting specific files, patchgen switches to `git diff` (commit messages are not available):

```bash
git diff v1.0.0..v1.1.0 -- file1.ts file2.ts
```

::: warning
When using **Select files to include** in tag compare mode, commit messages will not be included in the patch. This is because `git diff` is used instead of `git format-patch`.
:::

## When to Use

- You want to review what changed between two releases
- You need input for release notes or changelog writing
- You want a single patch containing the commits introduced since a previous tag

## Full Example

```bash
npx patchgen
```

```
◆ patchgen — Generate .patch files from your git repository
✔ Git repository detected.

◆ Select patch type:
○ Staged changes — ...
○ Compare branches — ...
● Compare tags — Generate a patch from commits between two tags, useful for release notes

◆ From tag: › v1.0.0
◆ To tag: › v1.1.0

◆ Which files to include?
● Include all files
○ Select files to include

◆ Output file name: › v1.0.0-v1.1.0.patch

┌ Summary
│ Patch type: Compare tags
│ From tag: v1.0.0
│ To tag: v1.1.0
│ Output file: v1.0.0-v1.1.0.patch
└

✔ Generate patch? Yes

✔ Generating patch...
✔ Done.
✔ Writing file...
✔ Patch saved to v1.0.0-v1.1.0.patch

◆ All done!
```

## Default File Name

The default output file name is derived from both tag names:

```
{from-tag}-{to-tag}.patch
```

For example, comparing `v1.0.0` with `v1.1.0` produces:

```
v1.0.0-v1.1.0.patch
```

Special characters like `/` are replaced with `-` to create a valid file name.

## Tag Suggestions

patchgen tries to suggest sensible defaults from your repository tags:

- **From tag** — the second most recent tag, when available
- **To tag** — the most recent tag, when available

You can accept the suggestions or type different tag names.

## Applying the Patch

### From `format-patch` (all files)

```bash
# Apply preserving commits
git am v1.0.0-v1.1.0.patch

# Or apply as a single diff
git apply v1.0.0-v1.1.0.patch
```

### From `diff` (selected files)

```bash
git apply v1.0.0-v1.1.0.patch
```

::: tip
Patches generated with `git format-patch` (all files) preserve commit history and are useful as raw material for release notes. Patches generated with `git diff` (selected files) can only be applied with `git apply`.
:::
