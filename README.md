> [!Caution] The action is still in active development and not ready for use,
> consider watching to receive updates on the progress.

# Upload Files to Slack action

This action will help you upload artifact from GitHub to Slack.

## Inputs

### `token`

**Required** Slack token.

### `file`

**Required** The artifact to upload.

### `filename`

**Required** Name of the artifact.

### `channelId`

Channel ID where the file will be shared, file will be private if not provided.

### `message`

The message text introducing the file in specified channels.

## Outputs

### `success`

Prints success once file is uploaded.

## Example usage

```yaml
uses: kibettheophilus/slack-file-upload@v0.1.1
with:
  file: 'artifact/to/upload.pdf'
  token: ${{ secrets.SLACK_TOKEN }}
```
