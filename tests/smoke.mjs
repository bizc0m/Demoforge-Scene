import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const pages = [
  '/',
  '/tools/studio.html',
  '/tools/ansi-motion.html',
  '/tools/shader-previews.html',
  '/DemoForge_Studio.html?reset=1',
  '/DemoForge_ANSI_Motion.html',
  '/demoforge_shader_v0_6_1_real_previews.html'
];

const types = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8']
]);

function targetPath(url) {
  const parsed = new URL(url, 'http://127.0.0.1');
  const pathname = parsed.pathname === '/' ? '/index.html' : parsed.pathname;
  const full = normalize(join(root, pathname));
  if (!full.startsWith(root)) throw new Error('Blocked path traversal');
  return full;
}

const server = createServer(async (req, res) => {
  try {
    const file = targetPath(req.url || '/');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types.get(extname(file)) || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});

await new Promise(resolveListen => server.listen(0, '127.0.0.1', resolveListen));
const { port } = server.address();

try {
  for (const page of pages) {
    const response = await fetch(`http://127.0.0.1:${port}${page}`);
    if (!response.ok) {
      throw new Error(`${page} returned ${response.status}`);
    }
    const body = await response.text();
    if (!body.includes('<html') && !body.includes('<!doctype html')) {
      throw new Error(`${page} does not look like HTML`);
    }
  }
  console.log(`Smoke OK: ${pages.length} pages`);
} finally {
  server.close();
}
