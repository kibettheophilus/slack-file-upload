import * as core from '@actions/core'
import axios from 'axios'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const uploadFile = core.getInput('file')
    const token = core.getInput('token')
    const fileName = core.getInput('filename')

    if (!uploadFile) {
      core.setFailed('You must provide `file` in your configuration')
    }

    getUploadUrl(token, fileName)

    core.setOutput('success', 'File uploaded to channelName')
    console.log('Filed uploaded successfully')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function getUploadUrl(token: string, fileName: string) {
  try {
    const response = await axios.get(
      'https://slack.com/api/files.getUploadURLExternal',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        params: {
          filename: fileName,
          length: 53072
        }
      }
    )
    console.log(response.data)
  } catch (error) {
    console.log('Error fetching url:', error)
  }
}
