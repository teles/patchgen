import type { GitCommand } from './patch-types.js'

export function buildStagedGitCommand(files?: string[]): GitCommand {
  const args = ['diff', '--cached']
  
  if (files && files.length > 0) {
    args.push('--', ...files)
  }
  
  return {
    command: 'git',
    args,
  }
}
