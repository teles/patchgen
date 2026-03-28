import { describe, it, expect } from 'vitest'
import { buildStagedSummary, buildBranchCompareSummary } from '../src/core/build-summary.js'

describe('buildStagedSummary', () => {
  it('returns correct summary items', () => {
    const items = buildStagedSummary('staged.patch')
    expect(items).toEqual([
      { label: 'Patch type', value: 'Staged changes' },
      { label: 'Output file', value: 'staged.patch' },
    ])
  })
})

describe('buildBranchCompareSummary', () => {
  it('returns correct summary items', () => {
    const items = buildBranchCompareSummary('main', 'feat-login', 'main-feat-login.patch')
    expect(items).toEqual([
      { label: 'Patch type', value: 'Compare branches' },
      { label: 'Base branch', value: 'main' },
      { label: 'Feature branch', value: 'feat-login' },
      { label: 'Output file', value: 'main-feat-login.patch' },
    ])
  })
})
