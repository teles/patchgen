import { describe, it, expect } from 'vitest'
import { ensurePatchExtension } from '../src/core/ensure-patch-extension.js'

describe('ensurePatchExtension', () => {
  it('adds .patch extension when missing', () => {
    expect(ensurePatchExtension('staged')).toBe('staged.patch')
  })

  it('does not duplicate .patch extension', () => {
    expect(ensurePatchExtension('staged.patch')).toBe('staged.patch')
  })

  it('trims whitespace before checking', () => {
    expect(ensurePatchExtension('  staged  ')).toBe('staged.patch')
  })

  it('preserves .patch when already present with trimming', () => {
    expect(ensurePatchExtension('  staged.patch  ')).toBe('staged.patch')
  })
})
