import type { GitCommand } from './patch-types.js'

export function buildStagedGitCommand(): GitCommand {
  return {
    command: 'git',
    args: ['diff', '--cached'],
  }
}
