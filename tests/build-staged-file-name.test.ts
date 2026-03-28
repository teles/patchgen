import { describe, it, expect } from 'vitest'
import { buildStagedFileName } from '../src/core/build-staged-file-name.js'

describe('buildStagedFileName', () => {
  it('returns staged.patch', () => {
    expect(buildStagedFileName()).toBe('staged.patch')
  })
})
