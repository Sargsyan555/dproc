/**
 * Vercel serverless function: POST /api/admin/login
 * Set ADMIN_PASSWORD in Vercel project Environment Variables for production.
 */
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = {};
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');
    if (raw) body = JSON.parse(raw);
  } catch {
    res.status(400).json({ error: 'Invalid JSON' });
    return;
  }

  const password = body.password;
  const expected = process.env.ADMIN_PASSWORD || 'admin';

  if (password !== expected) {
    res.status(401).json({ error: 'Invalid password' });
    return;
  }

  res.status(200).json({ ok: true });
}
