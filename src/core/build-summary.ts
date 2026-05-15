import type { PatchSummaryItem, FileSelection } from './patch-types.js'

function buildFileSelectionSummary(fileSelection?: FileSelection): PatchSummaryItem | null {
  if (!fileSelection || fileSelection.mode === 'all') {
    return null
  }
  return {
    label: 'Files selected',
    value: `${fileSelection.files.length} file${fileSelection.files.length === 1 ? '' : 's'}`,
  }
}

export function buildStagedSummary(
  outputFileName: string,
  fileSelection?: FileSelection
): PatchSummaryItem[] {
  const items: PatchSummaryItem[] = [
    { label: 'Patch type', value: 'Staged changes' },
  ]
  
  const fileItem = buildFileSelectionSummary(fileSelection)
  if (fileItem) items.push(fileItem)
  
  items.push({ label: 'Output file', value: outputFileName })
  return items
}

export function buildBranchCompareSummary(
  baseBranch: string,
  featureBranch: string,
  outputFileName: string,
  fileSelection?: FileSelection
): PatchSummaryItem[] {
  const items: PatchSummaryItem[] = [
    { label: 'Patch type', value: 'Compare branches' },
    { label: 'Base branch', value: baseBranch },
    { label: 'Feature branch', value: featureBranch },
  ]
  
  const fileItem = buildFileSelectionSummary(fileSelection)
  if (fileItem) {
    items.push(fileItem)
    items.push({ label: 'Note', value: 'Commit messages not included' })
  }
  
  items.push({ label: 'Output file', value: outputFileName })
  return items
}

export function buildTagCompareSummary(
  fromTag: string,
  toTag: string,
  outputFileName: string,
  fileSelection?: FileSelection
): PatchSummaryItem[] {
  const items: PatchSummaryItem[] = [
    { label: 'Patch type', value: 'Compare tags' },
    { label: 'From tag', value: fromTag },
    { label: 'To tag', value: toTag },
  ]

  const fileItem = buildFileSelectionSummary(fileSelection)
  if (fileItem) {
    items.push(fileItem)
    items.push({ label: 'Note', value: 'Commit messages not included' })
  }

  items.push({ label: 'Output file', value: outputFileName })
  return items
}
