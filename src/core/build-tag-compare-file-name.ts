import { sanitizeFileSegment } from './sanitize-file-segment.js'

export function buildTagCompareFileName(fromTag: string, toTag: string): string {
  const from = sanitizeFileSegment(fromTag)
  const to = sanitizeFileSegment(toTag)
  return `${from}-${to}.patch`
}
