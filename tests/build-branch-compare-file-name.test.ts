import { describe, it, expect } from 'vitest'
import { buildBranchCompareFileName } from '../src/core/build-branch-compare-file-name.js'

describe('buildBranchCompareFileName', () => {
  it('combines base and feature branch names', () => {
    expect(buildBranchCompareFileName('main', 'feat-login')).toBe('main-feat-login.patch')
  })

  it('sanitizes slashes in branch names', () => {
    expect(buildBranchCompareFileName('main', 'feature/login')).toBe('main-feature-login.patch')
  })

  it('sanitizes spaces in branch names', () => {
    expect(buildBranchCompareFileName('main', 'my feature')).toBe('main-my-feature.patch')
  })

  it('handles both branches needing sanitization', () => {
    expect(buildBranchCompareFileName('origin/main', 'feature/auth/login')).toBe(
      'origin-main-feature-auth-login.patch',
    )
  })
})
