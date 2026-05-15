export function validateTagCompareInput(fromTag: string, toTag: string): string[] {
  const errors: string[] = []

  if (!fromTag.trim()) {
    errors.push('From tag is required.')
  }

  if (!toTag.trim()) {
    errors.push('To tag is required.')
  }

  if (fromTag.trim() && toTag.trim() && fromTag.trim() === toTag.trim()) {
    errors.push('From tag and to tag must be different.')
  }

  return errors
}
