import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { access, chmod, copyFile, mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { homedir, platform as nodePlatform, arch as nodeArch, tmpdir } from 'node:os';
import { delimiter, dirname, join } from 'node:path';

import AdmZip from 'adm-zip';
import * as tar from 'tar';

const releaseRepository = 'nimbus-solution/nimbus';
const binaryName = nodePlatform() === 'win32' ? 'nimbus.exe' : 'nimbus';

export type InstallOptions = {
  dataDir?: string;
  force?: boolean;
  version?: string;
};

export type InstallResult = {
  path: string;
  version: string;
};

function managedBinaryPath(dataDir?: string): string {
  const root = dataDir ?? join(homedir(), '.local', 'share', 'sf');
  return join(root, 'nimbus', 'bin', binaryName);
}

async function isExecutable(path: string): Promise<boolean> {
  try {
    await access(path, nodePlatform() === 'win32' ? fsConstants.F_OK : fsConstants.X_OK);
    return true;
  } catch {
    return false;
  }
}

async function findOnPath(): Promise<string | undefined> {
  const pathEntries = (process.env.PATH ?? '').split(delimiter).filter(Boolean);
  for (const entry of pathEntries) {
    const candidate = join(entry, binaryName);
    if (await isExecutable(candidate)) return candidate;
  }

  return undefined;
}

export async function resolveNimbusBinary(dataDir?: string): Promise<string | undefined> {
  const override = process.env.NIMBUS_BINARY_PATH;
  if (override) {
    if (!(await isExecutable(override))) {
      throw new Error(`NIMBUS_BINARY_PATH does not point to an executable file: ${override}`);
    }

    return override;
  }

  const fromPath = await findOnPath();
  if (fromPath) return fromPath;

  const managed = managedBinaryPath(dataDir);
  return (await isExecutable(managed)) ? managed : undefined;
}

function releasePlatform(): { arch: string; extension: string; os: string } {
  const os = nodePlatform() === 'win32' ? 'windows' : nodePlatform() === 'darwin' ? 'darwin' : nodePlatform() === 'linux' ? 'linux' : undefined;
  const arch = nodeArch() === 'x64' ? 'amd64' : nodeArch() === 'arm64' ? 'arm64' : undefined;
  if (!os || !arch) {
    throw new Error(`Nimbus does not publish a binary for ${nodePlatform()}/${nodeArch()}`);
  }

  if (os === 'windows' && arch === 'arm64') {
    throw new Error('Nimbus does not yet publish a native Windows ARM64 binary. Install the amd64 build manually and set NIMBUS_BINARY_PATH.');
  }

  return { arch, extension: os === 'windows' ? 'zip' : 'tar.gz', os };
}

async function fetchChecked(url: string): Promise<Response> {
  const response = await fetch(url, {
    headers: { 'User-Agent': '@nimbus-solution/nimbus-sf-plugin' },
    redirect: 'follow',
  });
  if (!response.ok) throw new Error(`Download failed (${response.status} ${response.statusText}): ${url}`);
  return response;
}

async function latestVersion(): Promise<string> {
  const response = await fetchChecked(`https://github.com/${releaseRepository}/releases/latest`);
  const match = response.url.match(/\/tag\/v([^/?#]+)/);
  if (!match?.[1]) throw new Error('Could not determine the latest Nimbus release. Pass --version to pin one.');
  return match[1];
}

function expectedChecksum(contents: string, asset: string): string {
  for (const line of contents.split(/\r?\n/)) {
    const match = line.trim().match(/^([a-fA-F0-9]{64})\s+\*?(.+)$/);
    if (match?.[2] === asset) return match[1]!.toLowerCase();
  }

  throw new Error(`checksums.txt does not contain ${asset}`);
}

export async function installNimbus(options: InstallOptions = {}): Promise<InstallResult> {
  const version = (options.version && options.version !== 'latest' ? options.version : await latestVersion()).replace(/^v/, '');
  const destination = managedBinaryPath(options.dataDir);
  const currentVersion = await managedNimbusVersion(options.dataDir);
  if (!options.force && currentVersion === version && (await isExecutable(destination))) return { path: destination, version };

  const { arch, extension, os } = releasePlatform();
  const asset = `nimbus_${version}_${os}_${arch}.${extension}`;
  const releaseBase = `https://github.com/${releaseRepository}/releases/download/v${version}`;
  const [archiveResponse, checksumsResponse] = await Promise.all([
    fetchChecked(`${releaseBase}/${asset}`),
    fetchChecked(`${releaseBase}/checksums.txt`),
  ]);
  const archive = Buffer.from(await archiveResponse.arrayBuffer());
  const checksumText = await checksumsResponse.text();
  const actual = createHash('sha256').update(archive).digest('hex');
  const expected = expectedChecksum(checksumText, asset);
  if (actual !== expected) throw new Error(`Checksum verification failed for ${asset}`);

  const workDir = await mkdtemp(join(tmpdir(), 'nimbus-sf-plugin-'));
  try {
    const archivePath = join(workDir, asset);
    await writeFile(archivePath, archive);
    if (extension === 'zip') {
      new AdmZip(archivePath).extractAllTo(workDir, true);
    } else {
      await tar.x({ cwd: workDir, file: archivePath });
    }

    const extracted = join(workDir, binaryName);
    if (!(await isExecutable(extracted)) && nodePlatform() !== 'win32') await chmod(extracted, 0o755);
    if (!(await isExecutable(extracted))) {
      throw new Error(`Release archive ${asset} did not contain ${binaryName}`);
    }

    await mkdir(dirname(destination), { recursive: true });
    const staged = `${destination}.new`;
    await copyFile(extracted, staged);
    if (nodePlatform() !== 'win32') await chmod(staged, 0o755);
    if (nodePlatform() === 'win32' && (await isExecutable(destination))) {
      spawnSync(destination, ['daemon', 'stop'], { stdio: 'ignore', windowsHide: true });
    }
    await rm(destination, { force: true });
    await rename(staged, destination);
    await writeFile(join(dirname(destination), 'version'), `${version}\n`);
    return { path: destination, version };
  } finally {
    await rm(workDir, { force: true, recursive: true });
  }
}

export async function ensureNimbusBinary(dataDir?: string): Promise<string> {
  const existing = await resolveNimbusBinary(dataDir);
  if (existing) return existing;
  return (await installNimbus({ dataDir })).path;
}

export async function managedNimbusVersion(dataDir?: string): Promise<string | undefined> {
  try {
    return (await readFile(join(dirname(managedBinaryPath(dataDir)), 'version'), 'utf8')).trim() || undefined;
  } catch {
    return undefined;
  }
}

export function releaseAssetName(platform = nodePlatform(), arch = nodeArch(), version = '1.0.0'): string {
  const savedPlatform = platform;
  const os = savedPlatform === 'win32' ? 'windows' : savedPlatform === 'darwin' ? 'darwin' : savedPlatform === 'linux' ? 'linux' : undefined;
  const normalizedArch = arch === 'x64' ? 'amd64' : arch === 'arm64' ? 'arm64' : undefined;
  if (!os || !normalizedArch) throw new Error(`Unsupported platform: ${platform}/${arch}`);
  return `nimbus_${version}_${os}_${normalizedArch}.${os === 'windows' ? 'zip' : 'tar.gz'}`;
}
