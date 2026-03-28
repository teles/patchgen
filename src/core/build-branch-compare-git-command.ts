import type { GitCommand } from './patch-types.js'

export function buildBranchCompareGitCommand(baseBranch: string, featureBranch: string): GitCommand {
  return {
    command: 'git',
    args: ['format-patch', `${baseBranch}..${featureBranch}`, '--stdout'],
  }
}
