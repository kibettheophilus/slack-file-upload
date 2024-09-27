interface IResponse {
  ok: boolean
  upload_url?: string
  file_id?: string
  error?: string
}

export default async function APICall(
  token: string,
  fileName: string,
  fileLength: number,
  url: string,
  method: string
): Promise<IResponse> {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    params: {
      filename: fileName,
      length: fileLength
    }
  }
  try {
    const response = await fetch(url, config)
    console.log(response)
    const result = {
      ok: response.ok
    }
    return result
  } catch (err) {
    const error = err as Error
    throw Error(error.message)
  }
}
