import { describe, it, expect } from 'vitest'
import { buildTagCompareGitCommand } from '../src/core/build-tag-compare-git-command.js'

describe('buildTagCompareGitCommand', () => {
  it('returns git format-patch command with correct tag range', () => {
    expect(buildTagCompareGitCommand('v1.0.0', 'v1.1.0')).toEqual({
      command: 'git',
      args: ['format-patch', 'v1.0.0..v1.1.0', '--stdout'],
    })
  })

  it('uses the provided tags verbatim', () => {
    expect(buildTagCompareGitCommand('release/1.0.0', 'release/1.1.0')).toEqual({
      command: 'git',
      args: ['format-patch', 'release/1.0.0..release/1.1.0', '--stdout'],
    })
  })

  it('uses git diff when files are selected (loses commit messages)', () => {
    expect(buildTagCompareGitCommand('v1.0.0', 'v1.1.0', ['src/app.ts'])).toEqual({
      command: 'git',
      args: ['diff', 'v1.0.0..v1.1.0', '--', 'src/app.ts'],
    })
  })

  it('uses git diff with multiple selected files', () => {
    expect(buildTagCompareGitCommand('v1.0.0', 'v1.1.0', ['src/app.ts', 'src/utils.ts'])).toEqual({
      command: 'git',
      args: ['diff', 'v1.0.0..v1.1.0', '--', 'src/app.ts', 'src/utils.ts'],
    })
  })

  it('uses format-patch when files array is empty', () => {
    expect(buildTagCompareGitCommand('v1.0.0', 'v1.1.0', [])).toEqual({
      command: 'git',
      args: ['format-patch', 'v1.0.0..v1.1.0', '--stdout'],
    })
  })
})
