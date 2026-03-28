import { isGitRepository } from '../infra/git.js'
import { generatePatch } from '../app/generate-patch.js'
import { showIntro, showOutro, showError, createSpinner } from '../infra/cli.js'

async function run(): Promise<void> {
  showIntro()

  const spin = createSpinner()
  spin.start('Checking Git repository...')

  const isGit = await isGitRepository()

  if (!isGit) {
    spin.stop('Not a Git repository.')
    showError('This directory is not a Git repository. Please run patchgen inside a Git project.')
  }

  spin.stop('Git repository detected.')

  await generatePatch()

  showOutro('All done!')
}

run().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err)
  console.error(`Unexpected error: ${message}`)
  process.exit(1)
})
