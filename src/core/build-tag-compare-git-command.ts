import type { GitCommand } from './patch-types.js'

export function buildTagCompareGitCommand(
  fromTag: string,
  toTag: string,
  files?: string[]
): GitCommand {
  const range = `${fromTag}..${toTag}`

  // When specific files are selected, use git diff (loses commit messages)
  // Otherwise use git format-patch (preserves commit messages)
  if (files && files.length > 0) {
    return {
      command: 'git',
      args: ['diff', range, '--', ...files],
    }
  }

  return {
    command: 'git',
    args: ['format-patch', range, '--stdout'],
  }
}
