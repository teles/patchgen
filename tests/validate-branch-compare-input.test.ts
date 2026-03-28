import { describe, it, expect } from 'vitest'
import { validateBranchCompareInput } from '../src/core/validate-branch-compare-input.js'

describe('validateBranchCompareInput', () => {
  it('returns no errors for valid input', () => {
    expect(validateBranchCompareInput('main', 'feat-login')).toEqual([])
  })

  it('returns error when base branch is empty', () => {
    const errors = validateBranchCompareInput('', 'feat-login')
    expect(errors).toContain('Base branch is required.')
  })

  it('returns error when feature branch is empty', () => {
    const errors = validateBranchCompareInput('main', '')
    expect(errors).toContain('Feature branch is required.')
  })

  it('returns error when branches are the same', () => {
    const errors = validateBranchCompareInput('main', 'main')
    expect(errors).toContain('Base branch and feature branch must be different.')
  })

  it('returns multiple errors when both branches are empty', () => {
    const errors = validateBranchCompareInput('', '')
    expect(errors.length).toBe(2)
  })

  it('trims whitespace before comparison', () => {
    const errors = validateBranchCompareInput('  main  ', '  main  ')
    expect(errors).toContain('Base branch and feature branch must be different.')
  })
})
