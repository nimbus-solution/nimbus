# AGENTS.md — Salesforce CLI Plugin

Thin oclif bridge that publishes Nimbus as `@nimbus-solution/nimbus-sf-plugin`. The plugin resolves or installs the native Nimbus binary, verifies release checksums, and forwards arguments, stdio, working directory, environment, and exit status.

## Hard rules

1. **Keep this thin.** Runtime behavior belongs in the Go binary, not a TypeScript reimplementation.
2. **Plugin and runtime versions are independent.** A native Nimbus release does not automatically require an npm plugin release.
3. **Existing-command flags pass through.** New or changed flags on an already-wrapped command do not require plugin code or an npm release. Do not duplicate the native Cobra flag catalog in oclif.
4. **Commands and aliases do not pass through automatically.** A new, removed, or renamed top-level command or `sf` alias requires a wrapper/manifest/docs change and a new npm plugin version.
5. **Do not claim `sf plugins update` updates Nimbus itself.** It updates the TypeScript plugin only. An existing plugin-managed binary stays at its installed version until the user runs `sf nimbus install`; a first-time user gets the latest native release.
6. **Preserve native behavior.** Do not transform output, swallow non-zero exit codes, change the current directory, or reinterpret native arguments. The leading `--` exception exists only so `sf nimbus test -- --help` can reach native help.
7. **One login store.** `sf nimbus login/logout/whoami` forward to the native commands and share `~/.nimbus/license.json`. Never create Salesforce-plugin-specific credentials or use Salesforce org authentication for Nimbus licensing.
8. **Release assets are checksummed.** Keep `checksums.txt` verification and atomic installation. If native asset names/platforms change, update the resolver and tests before publishing.
9. **Public source must match npm.** The publishable copy lives at `nimbus-solution/nimbus/sf-plugin`. Sync and test it before npm publication; never publish private-monorepo-only changes.

## When to publish the npm plugin

| Change | Plugin release? |
|---|---:|
| New flag or changed flag default on `test`, `validate`, `exec`, etc. | No |
| Native Apex/runtime bug fix or output change | No |
| New top-level Nimbus command | Yes |
| Command removed or renamed | Yes |
| New/changed `sf nimbus apex ...` alias | Yes |
| Downloader, checksum, login bridge, platform support, dependencies | Yes |
| README change that must appear on npm | Yes |

## Layout

- `src/nimbus-command.ts` — base command and raw argument forwarding
- `src/nimbus-binary.ts` — PATH/managed binary resolution, GitHub download, checksum verification
- `src/run-nimbus.ts` — native process spawning and acquisition environment
- `src/commands/nimbus/*.ts` — one thin wrapper per exposed command
- `oclif.manifest.json` — generated command manifest; regenerate after command/alias changes
- `.github/workflows/sf-plugin.yml` — public CI and npm Trusted Publishing workflow

## Build and verification

Use Node 22.19 or newer.

```bash
make sf-plugin-test
make sf-plugin-link
make sf-plugin-pack
```

For a release:

1. Bump `package.json` and `package-lock.json` only when plugin code/docs changed.
2. Run tests, regenerate the manifest, and inspect `npm pack --dry-run`.
3. Sync the public repository copy and let its CI pass.
4. Publish through npm Trusted Publishing.
5. Install into an isolated Salesforce CLI data directory and smoke-test `version`, `whoami`, one alias, and exact failure exit propagation.

## Managed runtime update policy

Current behavior is explicit update: `sf nimbus install` fetches the latest native runtime, while ordinary commands reuse the installed managed binary. New users install the latest release automatically.

A future improvement may perform a throttled (for example, once-daily) version check and print an update notice. It must not silently replace the binary during an ordinary test run.
