import type { PatchSummaryItem } from './patch-types.js'

export function buildStagedSummary(outputFileName: string): PatchSummaryItem[] {
  return [
    { label: 'Patch type', value: 'Staged changes' },
    { label: 'Output file', value: outputFileName },
  ]
}

export function buildBranchCompareSummary(
  baseBranch: string,
  featureBranch: string,
  outputFileName: string,
): PatchSummaryItem[] {
  return [
    { label: 'Patch type', value: 'Compare branches' },
    { label: 'Base branch', value: baseBranch },
    { label: 'Feature branch', value: featureBranch },
    { label: 'Output file', value: outputFileName },
  ]
}
