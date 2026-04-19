import { put, del } from '@vercel/blob'

export async function uploadBlob(
  data: Buffer | Blob,
  filename: string,
  mimeType: string
): Promise<{ url: string; pathname: string }> {
  const blob = await put(filename, data, {
    access: 'public',
    contentType: mimeType,
    addRandomSuffix: true,
  })
  return { url: blob.url, pathname: blob.pathname }
}

export async function streamBlobContent(blobUrl: string): Promise<Response> {
  const response = await fetch(blobUrl)
  if (!response.ok) throw new Error(`Blob fetch failed: ${response.status}`)
  return response
}

export async function deleteBlobByUrl(blobUrl: string): Promise<void> {
  await del(blobUrl)
}
