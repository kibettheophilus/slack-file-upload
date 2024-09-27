import * as core from '@actions/core'
import axios, { AxiosResponse } from 'axios'
import * as fs from 'fs'
import FormData from 'form-data'
import APICall from './util'
import config from './config'

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
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function getUploadUrl(token: string, fileName: string) {
  try {
    const response = await APICall(
      token,
      fileName,
      53072,
      config.SLACK_GET_FILE_UPLOAD_URL,
      'GET'
    )
    uploadFile(response.upload_url!, response.file_id!, fileName, token)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error)
  }
}

async function uploadFile(
  upload_url: string,
  file_id: string,
  fileName: string,
  token: string
) {
  try {
    const formData = new FormData()

    const file = core.getInput('file')
    const fileStream = fs.createReadStream(file)

    formData.append('file', fileStream as unknown as Blob)
    // formData.append('filename', fileName)

    console.log(formData)

    const response = await axios.put(upload_url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(response.data)
    await completeUpload(file_id)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function completeUpload(fileId: string) {
  try {
    const token = core.getInput('token')
    const response = await axios.post(
      'https://slack.com/api/files.completeUploadExternal',
      {
        files: [
          {
            id: fileId
          }
        ],
        channel_id: 'C01UGRVDRUG'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log(response)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

interface GetUploadRes {
  ok: boolean
  upload_url: string
  file_id: string
}
