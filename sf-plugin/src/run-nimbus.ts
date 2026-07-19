import { spawn } from 'node:child_process';

export async function runNimbus(binary: string, args: string[]): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const child = spawn(binary, args, {
      cwd: process.cwd(),
      env: { ...process.env, NIMBUS_ACQUISITION: process.env.NIMBUS_ACQUISITION ?? 'sf_plugin' },
      stdio: 'inherit',
    });
    child.once('error', reject);
    child.once('exit', (code, signal) => {
      if (signal) {
        reject(new Error(`Nimbus terminated by signal ${signal}`));
      } else {
        resolve(code ?? 1);
      }
    });
  });
}
