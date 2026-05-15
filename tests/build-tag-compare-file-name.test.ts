import { describe, it, expect } from 'vitest'
import { buildTagCompareFileName } from '../src/core/build-tag-compare-file-name.js'

describe('buildTagCompareFileName', () => {
  it('combines from and to tag names', () => {
    expect(buildTagCompareFileName('v1.0.0', 'v1.1.0')).toBe('v1.0.0-v1.1.0.patch')
  })

  it('sanitizes slashes in tag names', () => {
    expect(buildTagCompareFileName('release/1.0.0', 'release/1.1.0')).toBe(
      'release-1.0.0-release-1.1.0.patch',
    )
  })

  it('sanitizes spaces in tag names', () => {
    expect(buildTagCompareFileName('release 1', 'release 2')).toBe('release-1-release-2.patch')
  })
})
