export function validateBranchCompareInput(baseBranch: string, featureBranch: string): string[] {
  const errors: string[] = []

  if (!baseBranch.trim()) {
    errors.push('Base branch is required.')
  }

  if (!featureBranch.trim()) {
    errors.push('Feature branch is required.')
  }

  if (baseBranch.trim() && featureBranch.trim() && baseBranch.trim() === featureBranch.trim()) {
    errors.push('Base branch and feature branch must be different.')
  }

  return errors
}
