// scripts/utils/with-server.mjs
import { spawn } from "child_process";

export async function withServer(fn, { port = 3000 } = {}) {
  const child = spawn("npm", ["run", "start", "--", "-p", String(port)], {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" },
  });
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // aguarda servidor subir (simples e robusto)
  let ok = false;
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://localhost:${port}/`, { method: "HEAD" });
      if (res.ok || res.status === 405) { ok = true; break; }
    } catch {}
    await wait(500);
  }
  try {
    if (!ok) throw new Error("Servidor não respondeu em tempo hábil.");
    return await fn({ baseUrl: `http://localhost:${port}` });
  } finally {
    child.kill("SIGTERM");
  }
}
