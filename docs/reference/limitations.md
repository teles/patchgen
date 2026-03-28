# Limitations & Roadmap

## Current Limitations

### Interactive Only

patchgen is designed as an interactive CLI. There is no non-interactive mode yet — you cannot pipe input or pass flags to skip prompts.

### Output Directory

The patch file is always saved to the current working directory. There is no `--output` or `--dir` flag to specify a different location.

### No Diff Preview

There is no way to preview the patch diff before saving. You see a summary (patch type, file names, output file) but not the actual diff content.

### Single Patch Per Run

Each invocation generates one `.patch` file. To create multiple patches, run patchgen multiple times.

### No Commit Message Filtering

When comparing branches with file selection, commit messages are not available because `git diff` is used instead of `git format-patch`. There is no way to include commit messages and filter by files at the same time.

## Roadmap

Planned features for future releases:

### Non-Interactive Mode

```bash
patchgen --mode staged --output my-changes.patch --no-prompt
```

Support for CI pipelines and scripted workflows where interactive prompts are not available.

### Output Directory

```bash
patchgen --output-dir ./patches/
```

Specify where the patch file should be saved, instead of always using the current directory.

### Config File Support

```json
// .patchgenrc
{
  "defaultMode": "staged",
  "outputDir": "./patches"
}
```

A config file to set defaults and customize behavior per project.

### Diff Preview

Show a colorized preview of the patch diff before saving, so you can verify the content is correct.

### Shell Completions

Tab completions for branch names and common options in bash, zsh, and fish.

---

::: tip Contributing
Issues and pull requests are welcome at [github.com/teles/patchgen](https://github.com/teles/patchgen).
:::
