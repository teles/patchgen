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

  it('uses git diff when files are selected (loses commit messages)', () => {
    expect(buildBranchCompareGitCommand('main', 'feat-login', ['src/app.ts'])).toEqual({
      command: 'git',
      args: ['diff', 'main..feat-login', '--', 'src/app.ts'],
    })
  })

  it('uses git diff with multiple selected files', () => {
    expect(buildBranchCompareGitCommand('main', 'feat-login', ['src/app.ts', 'src/utils.ts'])).toEqual({
      command: 'git',
      args: ['diff', 'main..feat-login', '--', 'src/app.ts', 'src/utils.ts'],
    })
  })

  it('uses format-patch when files array is empty', () => {
    expect(buildBranchCompareGitCommand('main', 'feat-login', [])).toEqual({
      command: 'git',
      args: ['format-patch', 'main..feat-login', '--stdout'],
    })
  })
})
