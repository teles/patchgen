import { sanitizeFileSegment } from './sanitize-file-segment.js'

export function buildBranchCompareFileName(baseBranch: string, featureBranch: string): string {
  const base = sanitizeFileSegment(baseBranch)
  const feature = sanitizeFileSegment(featureBranch)
  return `${base}-${feature}.patch`
}
