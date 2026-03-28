import { writeFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(resolve(filePath))
    return true
  } catch {
    return false
  }
}

export async function writePatchFile(filePath: string, content: string): Promise<void> {
  await writeFile(resolve(filePath), content, 'utf-8')
}
