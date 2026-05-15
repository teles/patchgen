import { describe, it, expect } from 'vitest'
import { findPatchRule, patchRules } from '../src/config/patch-rules.js'

describe('patchRules', () => {
  it('contains staged, branch-compare, and tag-compare rules', () => {
    const types = patchRules.map((r) => r.type)
    expect(types).toContain('staged')
    expect(types).toContain('branch-compare')
    expect(types).toContain('tag-compare')
  })

  it('each rule has required fields', () => {
    for (const rule of patchRules) {
      expect(rule.label).toBeTruthy()
      expect(rule.description).toBeTruthy()
      expect(typeof rule.buildDefaultFileName).toBe('function')
      expect(typeof rule.buildGitCommand).toBe('function')
      expect(typeof rule.validate).toBe('function')
      expect(typeof rule.buildSummary).toBe('function')
    }
  })
})

describe('findPatchRule', () => {
  it('finds staged rule', () => {
    expect(findPatchRule('staged')?.type).toBe('staged')
  })

  it('finds branch-compare rule', () => {
    expect(findPatchRule('branch-compare')?.type).toBe('branch-compare')
  })

  it('finds tag-compare rule', () => {
    expect(findPatchRule('tag-compare')?.type).toBe('tag-compare')
  })

  it('returns undefined for unknown mode', () => {
    expect(findPatchRule('unknown')).toBeUndefined()
  })
})

describe('staged rule integration', () => {
  const rule = findPatchRule('staged')!

  it('builds default file name', () => {
    expect(rule.buildDefaultFileName({ mode: 'staged' })).toBe('staged.patch')
  })

  it('builds git command', () => {
    expect(rule.buildGitCommand({ mode: 'staged' })).toEqual({
      command: 'git',
      args: ['diff', '--cached'],
    })
  })

  it('has no validation errors', () => {
    expect(rule.validate({ mode: 'staged' })).toEqual([])
  })

  it('builds summary with output file', () => {
    const summary = rule.buildSummary({ mode: 'staged' }, 'staged.patch')
    expect(summary).toEqual([
      { label: 'Patch type', value: 'Staged changes' },
      { label: 'Output file', value: 'staged.patch' },
    ])
  })
})

describe('branch-compare rule integration', () => {
  const rule = findPatchRule('branch-compare')!
  const params = { mode: 'branch-compare' as const, baseBranch: 'main', featureBranch: 'feat-login' }

  it('builds default file name', () => {
    expect(rule.buildDefaultFileName(params)).toBe('main-feat-login.patch')
  })

  it('builds git command', () => {
    expect(rule.buildGitCommand(params)).toEqual({
      command: 'git',
      args: ['format-patch', 'main..feat-login', '--stdout'],
    })
  })

  it('validates correct input with no errors', () => {
    expect(rule.validate(params)).toEqual([])
  })

  it('builds summary with all fields', () => {
    const summary = rule.buildSummary(params, 'main-feat-login.patch')
    expect(summary).toEqual([
      { label: 'Patch type', value: 'Compare branches' },
      { label: 'Base branch', value: 'main' },
      { label: 'Feature branch', value: 'feat-login' },
      { label: 'Output file', value: 'main-feat-login.patch' },
    ])
  })
})

describe('tag-compare rule integration', () => {
  const rule = findPatchRule('tag-compare')!
  const params = { mode: 'tag-compare' as const, fromTag: 'v1.0.0', toTag: 'v1.1.0' }

  it('builds default file name', () => {
    expect(rule.buildDefaultFileName(params)).toBe('v1.0.0-v1.1.0.patch')
  })

  it('builds git command', () => {
    expect(rule.buildGitCommand(params)).toEqual({
      command: 'git',
      args: ['format-patch', 'v1.0.0..v1.1.0', '--stdout'],
    })
  })

  it('validates correct input with no errors', () => {
    expect(rule.validate(params)).toEqual([])
  })

  it('builds summary with all fields', () => {
    const summary = rule.buildSummary(params, 'v1.0.0-v1.1.0.patch')
    expect(summary).toEqual([
      { label: 'Patch type', value: 'Compare tags' },
      { label: 'From tag', value: 'v1.0.0' },
      { label: 'To tag', value: 'v1.1.0' },
      { label: 'Output file', value: 'v1.0.0-v1.1.0.patch' },
    ])
  })
})
