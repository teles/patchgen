import type { PatchParams } from '../core/patch-types.js'
import { findPatchRule } from '../config/patch-rules.js'
import { runGitCommand } from '../infra/git.js'
import { writePatchFile, fileExists } from '../infra/fs.js'
import {
  promptPatchMode,
  promptBranchName,
  promptOutputFileName,
  promptConfirm,
  showSummary,
  showError,
  createSpinner,
} from '../infra/cli.js'
import { getCurrentBranch, getDefaultBranch } from '../infra/git.js'

async function collectBranchCompareParams(): Promise<Extract<PatchParams, { mode: 'branch-compare' }>> {
  const suggestedBase = await getDefaultBranch()
  const suggestedFeature = (await getCurrentBranch()) ?? 'feature'

  const baseBranch = await promptBranchName('Base branch:', suggestedBase)
  const featureBranch = await promptBranchName('Feature branch:', suggestedFeature)

  return { mode: 'branch-compare', baseBranch, featureBranch }
}

async function collectParams(mode: string): Promise<PatchParams> {
  if (mode === 'branch-compare') {
    return collectBranchCompareParams()
  }
  return { mode: 'staged' }
}

async function resolveOutputFileName(rule: ReturnType<typeof findPatchRule>, params: PatchParams): Promise<string> {
  if (!rule) showError('Unknown patch type.')
  const defaultFileName = rule!.buildDefaultFileName(params)
  return promptOutputFileName(defaultFileName)
}

async function handleOverwrite(outputFileName: string): Promise<void> {
  const exists = await fileExists(outputFileName)
  if (!exists) return

  const overwrite = await promptConfirm(`"${outputFileName}" already exists. Overwrite?`)
  if (!overwrite) showError('Aborted. File not overwritten.')
}

export async function generatePatch(): Promise<void> {
  const mode = await promptPatchMode()
  const params = await collectParams(mode)

  const rule = findPatchRule(mode)
  if (!rule) showError('Unknown patch type.')

  const validationErrors = rule!.validate(params)
  if (validationErrors.length > 0) {
    showError(validationErrors.join('\n'))
  }

  const outputFileName = await resolveOutputFileName(rule, params)

  const summary = rule!.buildSummary(params, outputFileName)
  showSummary(summary)

  const confirmed = await promptConfirm('Generate patch?')
  if (!confirmed) showError('Patch generation cancelled.')

  await handleOverwrite(outputFileName)

  const spin = createSpinner()
  const cmd = rule!.buildGitCommand(params)

  spin.start(mode === 'staged' ? 'Collecting staged changes...' : 'Generating patch...')
  let patchContent: string

  try {
    patchContent = await runGitCommand(cmd)
  } catch (err: unknown) {
    spin.stop('Failed to run git command.')
    const message = err instanceof Error ? err.message : String(err)
    showError(`Git error: ${message}`)
  }

  spin.stop('Done.')

  if (!patchContent!.trim()) {
    const emptyMessage =
      mode === 'staged'
        ? 'No staged changes found.'
        : `No differences found between '${(params as Extract<PatchParams, { mode: 'branch-compare' }>).baseBranch}' and '${(params as Extract<PatchParams, { mode: 'branch-compare' }>).featureBranch}'.`

    showError(emptyMessage)
  }

  const writeSpin = createSpinner()
  writeSpin.start('Writing file...')

  try {
    await writePatchFile(outputFileName, patchContent!)
    writeSpin.stop(`Patch saved to ${outputFileName}`)
  } catch (err: unknown) {
    writeSpin.stop('Failed to write file.')
    const message = err instanceof Error ? err.message : String(err)
    showError(`File error: ${message}`)
  }
}
