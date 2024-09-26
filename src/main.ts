import * as core from '@actions/core'
import axios, { AxiosResponse } from 'axios'

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
    if (!token) {
      core.setFailed('You must provide `token` in your configuration')
    }
    if (!fileName) {
      core.setFailed('You must provide `filename` in your configuration')
    }

    await getUploadUrl(token, fileName)

    console.log('Filed uploaded successfully')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function getUploadUrl(token: string, fileName: string) {
  try {
    const response = await axios.get<GetUploadRes>(
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

    await uploadFile(response.data, fileName, token, file)
    console.log(response.data)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error)
  }
}

async function uploadFile(
  input: GetUploadRes,
  fileName: string,
  token: string
) {
  try {
    const formData = new FormData()

    const file = core.getInput('file')

    formData.append(fileName, file)

    const response = await axios.post(input.upload_url, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error)
  }
}

interface GetUploadRes {
  ok: boolean
  upload_url: string
  file_id: string
}
