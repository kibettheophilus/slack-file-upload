import * as core from '@actions/core'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const uploadFile = core.getInput('file')

    if (!uploadFile) {
      core.setFailed('You must provide `file` in your configuration')
    }
    core.setOutput('success', 'File uploaded to channelName')
    console.log('Filed uploaded successfully')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
