export type PatchMode = 'staged' | 'branch-compare' | 'tag-compare'

export type FileSelection = {
  mode: 'all'
} | {
  mode: 'selected'
  files: string[]
}

export type PatchParams =
  | { mode: 'staged'; fileSelection?: FileSelection }
  | { mode: 'branch-compare'; baseBranch: string; featureBranch: string; fileSelection?: FileSelection }
  | { mode: 'tag-compare'; fromTag: string; toTag: string; fileSelection?: FileSelection }

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
