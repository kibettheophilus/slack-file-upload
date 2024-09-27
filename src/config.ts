const { SLACK_GET_FILE_UPLOAD_URL, SLACK_COMPLETE_FILE_UPLOAD_URL } =
  process.env

if (!SLACK_GET_FILE_UPLOAD_URL || !SLACK_COMPLETE_FILE_UPLOAD_URL) {
  process.exit(1)
}

export default {
  SLACK_GET_FILE_UPLOAD_URL,
  SLACK_COMPLETE_FILE_UPLOAD_URL
}