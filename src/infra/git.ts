import { execa } from 'execa'
import type { GitCommand } from '../core/patch-types.js'

export async function isGitRepository(): Promise<boolean> {
  try {
    await execa('git', ['rev-parse', '--is-inside-work-tree'])
    return true
  } catch {
    return false
  }
}

export async function getCurrentBranch(): Promise<string | null> {
  try {
    const { stdout } = await execa('git', ['branch', '--show-current'])
    return stdout.trim() || null
  } catch {
    return null
  }
}

export async function getDefaultBranch(): Promise<string> {
  try {
    const { stdout } = await execa('git', ['symbolic-ref', 'refs/remotes/origin/HEAD'])
    const branch = stdout.trim().replace('refs/remotes/origin/', '')
    return branch || 'main'
  } catch {
    const known = ['main', 'master']
    for (const branch of known) {
      try {
        await execa('git', ['rev-parse', '--verify', branch])
        return branch
      } catch {
        continue
      }
    }
    return 'main'
  }
}

export async function runGitCommand(cmd: GitCommand): Promise<string> {
  const { stdout } = await execa(cmd.command, cmd.args)
  return stdout
}

export async function getStagedFiles(): Promise<string[]> {
  try {
    const { stdout } = await execa('git', ['diff', '--cached', '--name-only'])
    return stdout.trim().split('\n').filter(Boolean)
  } catch {
    return []
  }
}

export async function getBranchCompareFiles(baseBranch: string, featureBranch: string): Promise<string[]> {
  try {
    const { stdout } = await execa('git', ['diff', '--name-only', `${baseBranch}..${featureBranch}`])
    return stdout.trim().split('\n').filter(Boolean)
  } catch {
    return []
  }
}
