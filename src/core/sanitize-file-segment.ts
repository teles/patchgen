const INVALID_SEGMENT_CHARS = /[^a-zA-Z0-9._\-]/g

export function sanitizeFileSegment(segment: string): string {
  return segment.replace(INVALID_SEGMENT_CHARS, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}
