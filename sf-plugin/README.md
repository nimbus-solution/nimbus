# Nimbus for Salesforce CLI

Run Nimbus through the official Salesforce CLI plugin system. The plugin installs the native Nimbus runtime automatically, verifies release checksums, and forwards command output and exit codes unchanged.

## Install

```bash
sf plugins install @nimbus-solution/nimbus-sf-plugin
```

Until the npm package is published, link a checkout for development:

```bash
cd sf-plugin
npm install
npm run build
sf plugins link .
```

## Commands

```bash
sf nimbus login
sf nimbus whoami
sf nimbus test "*"
sf nimbus validate --sema error
sf nimbus exec --code "System.debug(1 + 1);"
sf nimbus mutate AccountService --min-score 80
sf nimbus doctor
sf nimbus dev
sf nimbus serve
sf nimbus app
```

## Nimbus Pro login

The Salesforce CLI plugin uses the existing Nimbus account and license system. It does not use your Salesforce org login and does not keep a separate plugin credential.

```bash
sf nimbus login
```

This opens `testnimbus.dev` in your browser, signs you in to your Nimbus account, validates your Pro license, and activates the current machine. Nimbus stores the resulting license locally in `~/.nimbus/license.json` with user-only permissions. The native CLI and every `sf nimbus ...` command share that file, so logging in once enables Pro features through either entry point.

```bash
sf nimbus whoami       # Show the active account, plan, and license status
sf nimbus logout       # Deactivate this machine and free its license slot
```

Installing or updating the plugin-managed Nimbus runtime does not remove the login. Credentials are scoped to the current operating-system user; different users on the same computer sign in separately.

For headless CI, pass the license as a secret. Nimbus accepts `NIMBUS_LICENSE_KEY` only in detected CI or agent environments, and the plugin forwards it to the native runtime:

```bash
NIMBUS_LICENSE_KEY="$NIMBUS_LICENSE_KEY" sf nimbus test "*" --parallel 8
```

Salesforce-style Apex aliases are included:

```bash
sf nimbus apex run test AccountServiceTest --coverage
sf nimbus apex validate --json
sf nimbus apex run --code "System.debug('local');"
```

Every native Nimbus flag is passed through. Use `sf nimbus test -- --help` to see the native Nimbus command reference.

## Runtime management

On the first command, the plugin uses `nimbus` from `PATH` when available. Otherwise it downloads the latest signed-release asset from `nimbus-solution/nimbus`, verifies it against `checksums.txt`, and stores it under the Salesforce CLI data directory.

```bash
sf nimbus install
sf nimbus install --version 1.6.1
sf nimbus install --force
sf nimbus version
```

Set `NIMBUS_BINARY_PATH` to use an explicit binary, which is useful for development builds and pinned CI environments.

## License

The plugin and Nimbus runtime are provided under the Nimbus Proprietary License. See `LICENSE`.
