import {
  intro,
  outro,
  select,
  text,
  confirm,
  spinner,
  cancel,
  note,
  isCancel,
  multiselect,
} from '@clack/prompts'
import type { PatchSummaryItem } from '../core/patch-types.js'
import { patchRules } from '../config/patch-rules.js'
import { ensurePatchExtension } from '../core/ensure-patch-extension.js'

export function showIntro(): void {
  intro('patchgen — Generate .patch files from your git repository')
}

export function showOutro(message: string): void {
  outro(message)
}

export function showCancel(message = 'Operation cancelled.'): never {
  cancel(message)
  process.exit(0)
}

export function showError(message: string): never {
  cancel(message)
  process.exit(1)
}

export async function promptPatchMode(): Promise<string> {
  const result = await select({
    message: 'Select patch type:',
    options: patchRules.map((rule) => ({
      value: rule.type,
      label: rule.label,
      hint: rule.description,
    })),
  })

  if (isCancel(result)) showCancel()
  return result as string
}

export async function promptBranchName(
  message: string,
  defaultValue: string,
): Promise<string> {
  const result = await text({
    message,
    defaultValue,
    placeholder: defaultValue,
    validate: (value) => {
      const trimmed = (value || defaultValue).trim()
      if (!trimmed) return 'Branch name is required.'
    },
  })

  if (isCancel(result)) showCancel()
  return ((result as string) || defaultValue).trim()
}

export async function promptTagName(
  message: string,
  defaultValue?: string,
): Promise<string> {
  const placeholder = defaultValue ?? 'v1.0.0'
  const result = await text({
    message,
    defaultValue,
    placeholder,
    validate: (value) => {
      const trimmed = (value || defaultValue || '').trim()
      if (!trimmed) return 'Tag name is required.'
    },
  })

  if (isCancel(result)) showCancel()
  return ((result as string) || defaultValue || '').trim()
}

export async function promptOutputFileName(defaultFileName: string): Promise<string> {
  const result = await text({
    message: 'Output file name:',
    defaultValue: defaultFileName,
    placeholder: defaultFileName,
    validate: (value) => {
      const trimmed = (value || defaultFileName).trim()
      if (!trimmed) return 'File name is required.'
    },
  })

  if (isCancel(result)) showCancel()
  const raw = ((result as string) || defaultFileName).trim()
  return ensurePatchExtension(raw)
}

export async function promptConfirm(message: string): Promise<boolean> {
  const result = await confirm({ message })
  if (isCancel(result)) showCancel()
  return result as boolean
}

export function showSummary(items: PatchSummaryItem[]): void {
  const lines = items.map((item) => `${item.label}: ${item.value}`)
  note(lines.join('\n'), 'Summary')
}

export function createSpinner() {
  const s = spinner()
  return {
    start: (msg: string) => s.start(msg),
    stop: (msg: string) => s.stop(msg),
  }
}

export type FileSelectionMode = 'all' | 'select'

export async function promptFileSelectionMode(): Promise<FileSelectionMode> {
  const result = await select({
    message: 'Which files to include?',
    options: [
      { value: 'all', label: 'Include all files' },
      { value: 'select', label: 'Select files to include' },
    ],
  })

  if (isCancel(result)) showCancel()
  return result as FileSelectionMode
}

export async function promptSelectFiles(files: string[]): Promise<string[]> {
  const result = await multiselect({
    message: 'Select files to include:',
    options: files.map((file) => ({
      value: file,
      label: file,
    })),
    required: true,
  })

  if (isCancel(result)) showCancel()
  return result as string[]
}

export function showFileSelectionWarning(mode: string): void {
  if (mode === 'branch-compare' || mode === 'tag-compare') {
    const compareLabel = mode === 'tag-compare' ? 'tag compare' : 'branch compare'
    note(
      `When selecting specific files in ${compareLabel} mode,\ncommit messages will not be included in the patch.`,
      'Note'
    )
  }
}
