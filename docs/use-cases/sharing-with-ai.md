# Sharing with AI / LLMs

Patch files are a practical format for sharing code changes with AI assistants and large language models.

## Why Patches Work Well for AI

### Structured Format

A `.patch` file contains a machine-readable, structured diff that clearly shows:

- Which files were changed
- What was added (lines prefixed with `+`)
- What was removed (lines prefixed with `-`)
- Surrounding context for each change

This is much more useful than pasting raw code blocks or screenshots.

### Complete Context

Unlike copying individual files, a patch captures the **full change set** — every modification across every file, in one document. This gives the AI a complete picture without you having to manually assemble context.

### Compact Size

Patches only contain the diff, not the entire file contents. This means:

- Less token usage when sending to an LLM
- More room in the context window for the AI's response
- Faster processing

## How to Use

### 1. Generate the Patch

```bash
npx patchgen
```

Follow the prompts to create a `.patch` file from your staged changes, branch diff, or tag diff.

### 2. Share with AI

You can paste the patch content directly into your AI assistant's chat, or reference the file:

```
Here's my patch file for review:

diff --git a/src/auth/login.ts b/src/auth/login.ts
index abc123..def456 100644
--- a/src/auth/login.ts
+++ b/src/auth/login.ts
@@ -10,6 +10,8 @@ export async function login(credentials: Credentials) {
   const user = await findUser(credentials.email)
   if (!user) throw new AuthError('User not found')
 
+  const isLocked = await checkAccountLock(user.id)
+  if (isLocked) throw new AuthError('Account is locked')
+
   const valid = await verifyPassword(credentials.password, user.hash)
```

### 3. Ask for Review

Useful prompts to pair with a patch file:

- "Review this patch for potential bugs or issues"
- "Suggest improvements for these changes"
- "Explain what this patch does"
- "Are there any edge cases I'm missing?"
- "Write unit tests for the changes in this patch"

## Best Practices

### Use File Selection for Focused Reviews

If your change set is large, use patchgen's [file selection](/use-cases/file-selection) to create focused patches:

```
◆ Select files to include:
◼ src/auth/login.ts
◼ src/auth/utils.ts
◻ src/config.ts          ← exclude unrelated changes
◻ package-lock.json       ← exclude noise
```

A smaller, focused patch leads to better AI responses.

### Staged Changes for Work-in-Progress

Use the **staged changes** mode to share work-in-progress code:

```bash
git add src/feature.ts
npx patchgen
# → share staged.patch with your AI assistant
```

This captures exactly what you're working on, without noise from uncommitted or unrelated files.

### Branch Comparison for Full Features

Use **branch comparison** to share a complete feature for review:

```bash
npx patchgen
# Select: Compare branches
# Base: main, Feature: feat/new-api
# → share main-feat-new-api.patch
```

This gives the AI the full scope of your feature branch.

### Tag Comparison for Release Notes

Use **tag comparison** to give an AI assistant the changes between releases:

```bash
npx patchgen
# Select: Compare tags
# From tag: v1.0.0, To tag: v1.1.0
# → share v1.0.0-v1.1.0.patch
```

This is useful when asking for a release-note draft or a summary of user-facing changes.

::: tip
Patch files are especially useful when working with AI assistants that have file upload or large context support. Instead of pasting multiple files, upload a single `.patch` file.
:::
