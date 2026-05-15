import type { PatchParams, FileSelection } from '../core/patch-types.js'
import { findPatchRule } from '../config/patch-rules.js'
import {
  runGitCommand,
  getStagedFiles,
  getBranchCompareFiles,
  getTagCompareFiles,
  getRecentTags,
  getCurrentBranch,
  getDefaultBranch,
} from '../infra/git.js'
import { writePatchFile, fileExists } from '../infra/fs.js'
import {
  promptPatchMode,
  promptBranchName,
  promptTagName,
  promptOutputFileName,
  promptConfirm,
  promptFileSelectionMode,
  promptSelectFiles,
  showSummary,
  showError,
  showFileSelectionWarning,
  createSpinner,
} from '../infra/cli.js'

async function collectBranchCompareParams(): Promise<Extract<PatchParams, { mode: 'branch-compare' }>> {
  const suggestedBase = await getDefaultBranch()
  const suggestedFeature = (await getCurrentBranch()) ?? 'feature'

  const baseBranch = await promptBranchName('Base branch:', suggestedBase)
  const featureBranch = await promptBranchName('Feature branch:', suggestedFeature)

  return { mode: 'branch-compare', baseBranch, featureBranch }
}

async function collectTagCompareParams(): Promise<Extract<PatchParams, { mode: 'tag-compare' }>> {
  const suggestedTags = await getRecentTags()

  const fromTag = await promptTagName('From tag:', suggestedTags[1])
  const toTag = await promptTagName('To tag:', suggestedTags[0])

  return { mode: 'tag-compare', fromTag, toTag }
}

async function collectParams(mode: string): Promise<PatchParams> {
  if (mode === 'branch-compare') {
    return collectBranchCompareParams()
  }
  if (mode === 'tag-compare') {
    return collectTagCompareParams()
  }
  return { mode: 'staged' }
}

async function getChangedFiles(params: PatchParams): Promise<string[]> {
  if (params.mode === 'staged') {
    return getStagedFiles()
  }
  if (params.mode === 'branch-compare') {
    return getBranchCompareFiles(params.baseBranch, params.featureBranch)
  }
  return getTagCompareFiles(params.fromTag, params.toTag)
}

async function collectFileSelection(params: PatchParams): Promise<FileSelection | undefined> {
  const files = await getChangedFiles(params)
  
  if (files.length === 0) {
    return undefined
  }

  const selectionMode = await promptFileSelectionMode()
  
  if (selectionMode === 'all') {
    return { mode: 'all' }
  }

  showFileSelectionWarning(params.mode)
  const selectedFiles = await promptSelectFiles(files)
  
  return { mode: 'selected', files: selectedFiles }
}

function applyFileSelection(params: PatchParams, fileSelection?: FileSelection): PatchParams {
  if (params.mode === 'staged') {
    return { ...params, fileSelection }
  }
  return { ...params, fileSelection }
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

function buildEmptyPatchMessage(params: PatchParams): string {
  if (params.mode === 'staged') {
    return 'No staged changes found.'
  }

  if (params.mode === 'branch-compare') {
    return `No differences found between '${params.baseBranch}' and '${params.featureBranch}'.`
  }

  return `No differences found between tags '${params.fromTag}' and '${params.toTag}'.`
}

export async function generatePatch(): Promise<void> {
  const mode = await promptPatchMode()
  let params = await collectParams(mode)

  const rule = findPatchRule(mode)
  if (!rule) showError('Unknown patch type.')

  const validationErrors = rule!.validate(params)
  if (validationErrors.length > 0) {
    showError(validationErrors.join('\n'))
  }

  // File selection step
  const fileSelection = await collectFileSelection(params)
  params = applyFileSelection(params, fileSelection)

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
    showError(buildEmptyPatchMessage(params))
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
