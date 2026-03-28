import { describe, it, expect } from 'vitest'
import { buildStagedSummary, buildBranchCompareSummary } from '../src/core/build-summary.js'
import type { FileSelection } from '../src/core/patch-types.js'

describe('buildStagedSummary', () => {
  it('returns correct summary items', () => {
    const items = buildStagedSummary('staged.patch')
    expect(items).toEqual([
      { label: 'Patch type', value: 'Staged changes' },
      { label: 'Output file', value: 'staged.patch' },
    ])
  })

  it('includes file count when files are selected', () => {
    const fileSelection: FileSelection = { mode: 'selected', files: ['a.ts', 'b.ts'] }
    const items = buildStagedSummary('staged.patch', fileSelection)
    expect(items).toContainEqual({ label: 'Files selected', value: '2 files' })
  })

  it('handles single file selection', () => {
    const fileSelection: FileSelection = { mode: 'selected', files: ['a.ts'] }
    const items = buildStagedSummary('staged.patch', fileSelection)
    expect(items).toContainEqual({ label: 'Files selected', value: '1 file' })
  })

  it('does not include file count when mode is all', () => {
    const fileSelection: FileSelection = { mode: 'all' }
    const items = buildStagedSummary('staged.patch', fileSelection)
    expect(items).not.toContainEqual(expect.objectContaining({ label: 'Files selected' }))
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

  it('includes file count and note when files are selected', () => {
    const fileSelection: FileSelection = { mode: 'selected', files: ['a.ts', 'b.ts'] }
    const items = buildBranchCompareSummary('main', 'feat-login', 'main-feat-login.patch', fileSelection)
    expect(items).toContainEqual({ label: 'Files selected', value: '2 files' })
    expect(items).toContainEqual({ label: 'Note', value: 'Commit messages not included' })
  })
})
