# Staged Changes

Generate a `.patch` file from files you've already staged with `git add`.

## How It Works

When you select **Staged changes**, patchgen runs:

```bash
git diff --cached
```

This captures the diff of all files in the Git staging area. If you've selected specific files, it runs:

```bash
git diff --cached -- file1.ts file2.ts
```

## When to Use

- You've made changes and staged them with `git add`
- You want to capture exactly what's staged, nothing more
- You need a patch to share, review, or apply elsewhere

## Full Example

```bash
# Stage your changes
git add src/auth/login.ts src/auth/utils.ts

# Generate the patch
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

## With File Selection

If you've staged multiple files but only want some in the patch:

```
◆ Which files to include?
○ Include all files
● Select files to include

◆ Select files to include:
◼ src/auth/login.ts
◻ src/auth/utils.ts
◼ src/config.ts
```

Only the selected files will be included in the generated patch.

## Default File Name

For staged changes, the default output file name is:

```
staged.patch
```

You can change it to anything you like at the prompt. The `.patch` extension is added automatically if you omit it.

## Applying the Patch

The generated patch can be applied with:

```bash
git apply staged.patch
```

Or to apply and stage the changes:

```bash
git apply --index staged.patch
```

## Tips

::: tip
Make sure your changes are staged (`git add`) before running patchgen. If nothing is staged, patchgen will report that no changes were found.
:::

::: tip
Use `git status` to verify what's staged before generating a patch.
:::
