import { describe, it, expect } from 'vitest'
import { buildStagedGitCommand } from '../src/core/build-staged-git-command.js'

describe('buildStagedGitCommand', () => {
  it('returns git diff --cached command', () => {
    expect(buildStagedGitCommand()).toEqual({
      command: 'git',
      args: ['diff', '--cached'],
    })
  })

  it('includes selected files when provided', () => {
    expect(buildStagedGitCommand(['src/app.ts', 'src/utils.ts'])).toEqual({
      command: 'git',
      args: ['diff', '--cached', '--', 'src/app.ts', 'src/utils.ts'],
    })
  })

  it('ignores empty files array', () => {
    expect(buildStagedGitCommand([])).toEqual({
      command: 'git',
      args: ['diff', '--cached'],
    })
  })
})
