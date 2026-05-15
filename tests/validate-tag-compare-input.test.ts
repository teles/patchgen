import { describe, it, expect } from 'vitest'
import { validateTagCompareInput } from '../src/core/validate-tag-compare-input.js'

describe('validateTagCompareInput', () => {
  it('returns no errors for valid input', () => {
    expect(validateTagCompareInput('v1.0.0', 'v1.1.0')).toEqual([])
  })

  it('returns error when from tag is empty', () => {
    const errors = validateTagCompareInput('', 'v1.1.0')
    expect(errors).toContain('From tag is required.')
  })

  it('returns error when to tag is empty', () => {
    const errors = validateTagCompareInput('v1.0.0', '')
    expect(errors).toContain('To tag is required.')
  })

  it('returns error when tags are the same', () => {
    const errors = validateTagCompareInput('v1.0.0', 'v1.0.0')
    expect(errors).toContain('From tag and to tag must be different.')
  })

  it('returns multiple errors when both tags are empty', () => {
    const errors = validateTagCompareInput('', '')
    expect(errors.length).toBe(2)
  })

  it('trims whitespace before comparison', () => {
    const errors = validateTagCompareInput('  v1.0.0  ', '  v1.0.0  ')
    expect(errors).toContain('From tag and to tag must be different.')
  })
})
