import { spawn } from 'child_process';
import http from 'http';

function waitForReady(url, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      http.get(url, (res) => res.statusCode ? resolve(true) : setTimeout(tick, 500))
          .on('error', () => Date.now() - start > timeoutMs ? reject(new Error('server timeout')) : setTimeout(tick, 500));
    };
    tick();
  });
}

export async function withServer({ port = 3123, build = true }, fn) {
  if (build) {
    await new Promise((res, rej) => {
      const b = spawn('npm', ['run', 'build'], { stdio: 'inherit', shell: true });
      b.on('close', (code) => code === 0 ? res() : rej(new Error('build failed')));
    });
  }
  const server = spawn('npx', ['next', 'start', '-p', String(port)], { stdio: 'inherit', shell: true });
  try {
    await waitForReady(`http://localhost:${port}/`);
    return await fn({ baseUrl: `http://localhost:${port}` });
  } finally {
    server.kill('SIGTERM');
  }
}
