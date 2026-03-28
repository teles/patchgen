import type { GitCommand } from './patch-types.js'

export function buildBranchCompareGitCommand(
  baseBranch: string,
  featureBranch: string,
  files?: string[]
): GitCommand {
  // When specific files are selected, use git diff (loses commit messages)
  // Otherwise use git format-patch (preserves commit messages)
  if (files && files.length > 0) {
    return {
      command: 'git',
      args: ['diff', `${baseBranch}..${featureBranch}`, '--', ...files],
    }
  }

  return {
    command: 'git',
    args: ['format-patch', `${baseBranch}..${featureBranch}`, '--stdout'],
  }
}
