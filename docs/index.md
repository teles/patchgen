---
layout: home

hero:
  name: patchgen
  text: Git patch files made easy
  tagline: A guided CLI to generate .patch files from staged changes, branch diffs, and tag diffs.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/teles/patchgen

features:
  - icon: 📦
    title: Staged Changes
    details: Generate a patch from files already staged in Git with a single guided flow.
  - icon: 🔀
    title: Branch Comparison
    details: Create patches from the diff between any two branches — base and feature.
  - icon: 🏷️
    title: Tag Comparison
    details: Compare release tags to capture changes for release notes and reviews.
  - icon: 📋
    title: File Selection
    details: Include all changed files or pick specific ones from a multi-select list.
  - icon: 🤖
    title: AI-Friendly Output
    details: Share structured .patch files with LLMs and AI assistants for accurate code reviews.
  - icon: 💬
    title: Interactive CLI
    details: Step-by-step prompts guide you through the entire patch creation process.
  - icon: 📄
    title: Predictable Output
    details: Clean .patch files ready to be applied with git apply or shared with your team.
---

## Quick Example

```bash
npx patchgen
```

```
◆ patchgen — Generate .patch files from your git repository
✔ Git repository detected.

◆ Select patch type:
● Staged changes
○ Compare branches
○ Compare tags

◆ Which files to include?
● Include all files

◆ Output file name: › staged.patch

✔ Generate patch? Yes
✔ Patch saved to staged.patch

◆ All done!
```

## Install

```bash
# Run without installing
npx patchgen

# Or install globally
npm install -g patchgen
```
