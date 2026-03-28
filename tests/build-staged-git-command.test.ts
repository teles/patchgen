import { describe, it, expect } from 'vitest'
import { buildStagedGitCommand } from '../src/core/build-staged-git-command.js'

describe('buildStagedGitCommand', () => {
  it('returns git diff --cached command', () => {
    expect(buildStagedGitCommand()).toEqual({
      command: 'git',
      args: ['diff', '--cached'],
    })
  })
})
