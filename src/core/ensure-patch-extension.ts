export function ensurePatchExtension(fileName: string): string {
  const trimmed = fileName.trim()
  return trimmed.endsWith('.patch') ? trimmed : `${trimmed}.patch`
}
