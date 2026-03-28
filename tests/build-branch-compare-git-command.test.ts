import { describe, it, expect } from 'vitest'
import { buildBranchCompareGitCommand } from '../src/core/build-branch-compare-git-command.js'

describe('buildBranchCompareGitCommand', () => {
  it('returns git format-patch command with correct range', () => {
    expect(buildBranchCompareGitCommand('main', 'feat-login')).toEqual({
      command: 'git',
      args: ['format-patch', 'main..feat-login', '--stdout'],
    })
  })

  it('uses the provided branches verbatim', () => {
    expect(buildBranchCompareGitCommand('develop', 'feature/auth')).toEqual({
      command: 'git',
      args: ['format-patch', 'develop..feature/auth', '--stdout'],
    })
  })
})
