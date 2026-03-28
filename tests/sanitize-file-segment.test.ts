import { describe, it, expect } from 'vitest'
import { sanitizeFileSegment } from '../src/core/sanitize-file-segment.js'

describe('sanitizeFileSegment', () => {
  it('replaces forward slashes with hyphens', () => {
    expect(sanitizeFileSegment('feature/login')).toBe('feature-login')
  })

  it('replaces spaces with hyphens', () => {
    expect(sanitizeFileSegment('my branch')).toBe('my-branch')
  })

  it('collapses multiple invalid chars into a single hyphen', () => {
    expect(sanitizeFileSegment('feat//login')).toBe('feat-login')
  })

  it('strips leading and trailing hyphens', () => {
    expect(sanitizeFileSegment('/feature/')).toBe('feature')
  })

  it('preserves valid chars', () => {
    expect(sanitizeFileSegment('feat-login_v2.0')).toBe('feat-login_v2.0')
  })

  it('handles already-clean names', () => {
    expect(sanitizeFileSegment('main')).toBe('main')
  })
})
