export type PatchMode = 'staged' | 'branch-compare'

export type PatchParams =
  | { mode: 'staged' }
  | { mode: 'branch-compare'; baseBranch: string; featureBranch: string }

export type GitCommand = {
  command: string
  args: string[]
}

export type PatchSummaryItem = {
  label: string
  value: string
}

export type PatchRule<P extends PatchParams = PatchParams> = {
  type: PatchMode
  label: string
  description: string
  buildDefaultFileName: (params: P) => string
  buildGitCommand: (params: P) => GitCommand
  validate: (params: P) => string[]
  buildSummary: (params: P, outputFileName: string) => PatchSummaryItem[]
}
