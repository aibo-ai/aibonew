import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    const buffer = Buffer.concat(chunks);

    const contentType = req.headers['content-type'] || '';
    const boundary = contentType.split('boundary=')[1];
    if (!boundary) return res.status(400).json({ error: 'No boundary found' });

    const bodyStr = buffer.toString('binary');
    const parts = bodyStr.split(`--${boundary}`);
    let fileBuffer: Buffer | null = null;
    let filename = 'upload.jpg';
    let mimetype = 'image/jpeg';

    for (const part of parts) {
      if (!part.includes('Content-Disposition')) continue;
      const headerEnd = part.indexOf('\r\n\r\n');
      if (headerEnd === -1) continue;
      const headers = part.substring(0, headerEnd);
      if (!headers.includes('filename=')) continue;

      const fnMatch = headers.match(/filename="([^"]+)"/);
      if (fnMatch) filename = fnMatch[1];
      const mtMatch = headers.match(/Content-Type:\s*([^\r\n]+)/);
      if (mtMatch) mimetype = mtMatch[1].trim();

      const fileData = part.substring(headerEnd + 4, part.lastIndexOf('\r\n'));
      fileBuffer = Buffer.from(fileData, 'binary');
      break;
    }

    if (!fileBuffer) return res.status(400).json({ error: 'No file found in request' });

    const blob = await put(`blog-images/${Date.now()}-${filename}`, fileBuffer, {
      access: 'public',
      contentType: mimetype,
    });

    return res.status(200).json({ url: blob.url });
  } catch (err: any) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: err.message || 'Upload failed' });
  }
}
