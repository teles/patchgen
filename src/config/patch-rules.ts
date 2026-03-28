import { buildStagedFileName } from '../core/build-staged-file-name.js'
import { buildBranchCompareFileName } from '../core/build-branch-compare-file-name.js'
import { buildStagedGitCommand } from '../core/build-staged-git-command.js'
import { buildBranchCompareGitCommand } from '../core/build-branch-compare-git-command.js'
import { validateBranchCompareInput } from '../core/validate-branch-compare-input.js'
import { buildStagedSummary, buildBranchCompareSummary } from '../core/build-summary.js'
import type { PatchRule, PatchParams } from '../core/patch-types.js'

type StagedParams = Extract<PatchParams, { mode: 'staged' }>
type BranchCompareParams = Extract<PatchParams, { mode: 'branch-compare' }>

const stagedRule: PatchRule<StagedParams> = {
  type: 'staged',
  label: 'Staged changes',
  description: 'Generate a patch from staged files',
  buildDefaultFileName: () => buildStagedFileName(),
  buildGitCommand: () => buildStagedGitCommand(),
  validate: () => [],
  buildSummary: (_params, outputFileName) => buildStagedSummary(outputFileName),
}

const branchCompareRule: PatchRule<BranchCompareParams> = {
  type: 'branch-compare',
  label: 'Compare branches',
  description: 'Generate a patch from commits in a feature branch not present in a base branch',
  buildDefaultFileName: (params) => buildBranchCompareFileName(params.baseBranch, params.featureBranch),
  buildGitCommand: (params) => buildBranchCompareGitCommand(params.baseBranch, params.featureBranch),
  validate: (params) => validateBranchCompareInput(params.baseBranch, params.featureBranch),
  buildSummary: (params, outputFileName) =>
    buildBranchCompareSummary(params.baseBranch, params.featureBranch, outputFileName),
}

export const patchRules: PatchRule[] = [
  stagedRule as PatchRule,
  branchCompareRule as PatchRule,
]

export function findPatchRule(mode: string): PatchRule | undefined {
  return patchRules.find((r) => r.type === mode)
}
