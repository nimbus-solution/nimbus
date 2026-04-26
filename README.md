# Nimbus

**A local Apex runtime and test runner.**

Run, test, and debug Apex on your own machine — no org, no Docker, no deploy.
Real SOQL, real triggers, real DML, executed against an embedded PostgreSQL
database. Tests complete in milliseconds.

> **[testnimbus.dev](https://testnimbus.dev)** — full documentation, comparisons, pricing, and changelog.

This repository hosts the official Nimbus binary releases. For source-level
discussion, support, and product information, the canonical destination is
the website above.

---

## Install

One line, single static binary, no runtime dependencies. Linux, macOS (Intel
and Apple Silicon), and Windows (via WSL).

```sh
curl -fsSL https://install.testnimbus.dev | sh
```

Verify:

```sh
nimbus --version
```

The install script verifies a SHA256 checksum against the release published
here and drops the binary into `~/.local/bin`. Re-run any time to upgrade.

Direct download is also available from the [Releases](https://github.com/nimbus-solution/nimbus-releases/releases)
tab if you'd rather not pipe to a shell — pick the archive for your platform,
extract, and put `nimbus` on your PATH.

### VS Code extension

```sh
code --install-extension NimbusSolutions.testnimbus
```

Or install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=NimbusSolutions.testnimbus).
Inline test runners, live debugging, coverage gutters, execution traces, and
governor limit tracking. Full feature breakdown:
[testnimbus.dev/vscode](https://testnimbus.dev/vscode).

---

## Quickstart

The fastest way to confirm your install works is the BerlinBrew demo —
a small fictional craft-brewery SFDX project with 96 passing tests:

```sh
git clone https://github.com/nimbus-solution/berlinbrew-demo
cd berlinbrew-demo
nimbus test
```

Expected: green "96 passed" in under a second.

To use Nimbus on your own SFDX project:

```sh
cd path/to/your/sfdx-project
nimbus init
nimbus doctor      # verifies setup, surfaces any config nudges
nimbus test        # run all tests
```

Common variants:

```sh
nimbus test AccountTriggerTest                          # one class
nimbus test AccountTriggerTest.testInsertCreatesContact # one method
nimbus test "*Selector*Test"                            # glob pattern
nimbus test --coverage                                  # line coverage
nimbus test --json                                      # machine-readable
nimbus dev                                              # browser dashboard + REPL
```

Full walkthrough with screenshots and the optional org-sync step:
**[testnimbus.dev/quickstart](https://testnimbus.dev/quickstart)**

---

## Documentation

Everything lives on the website:

- **[Quickstart](https://testnimbus.dev/quickstart)** — five steps from install to passing test.
- **[Documentation](https://testnimbus.dev/docs)** — every command, flag, and configuration option.
- **[VS Code integration](https://testnimbus.dev/vscode)** — gutter runners, inline coverage, breakpoint debugging.
- **[CI integration](https://testnimbus.dev/ci)** — GitHub Actions, GitLab, SonarQube, Codecov recipes.
- **[Use with AI coding agents](https://testnimbus.dev/agentic)** — Claude Code, Cursor, Copilot.
- **[Compare](https://testnimbus.dev/compare)** — honest breakdown of what Nimbus does and doesn't replicate.
- **[FAQ](https://testnimbus.dev/faq)** — runtime accuracy, governor limits, managed packages.
- **[Changelog](https://testnimbus.dev/changelog)** — release-by-release notes.

---

## Reporting issues

Bug reports go in this repository's [issue tracker](https://github.com/nimbus-solution/nimbus-releases/issues).

A good report saves a round trip. Please include:

1. **Nimbus version** — output of `nimbus --version`.
2. **Operating system and architecture** — e.g. `macOS 14.5 (arm64)`, `Ubuntu 22.04 (x86_64)`.
3. **A minimal reproduction** — the smallest Apex class or test that triggers the
   bug. If your real codebase is private, we strongly prefer a stripped-down
   reproduction in a clean SFDX project. The
   [BerlinBrew demo](https://github.com/nimbus-solution/berlinbrew-demo) is a
   useful starting point if you need a known-good baseline to fork from.
4. **The exact command you ran** — copy-paste from your terminal.
5. **What you expected vs. what happened** — actual output, error messages, or
   stack traces, copied as text (not screenshots) so they're searchable.
6. **`nimbus doctor` output** — paste the full result; it captures the
   environment context that resolves a third of all reports without further
   questions.

A reproduction template:

```
**Nimbus version:** 0.x.y
**OS / arch:** macOS 14.5 (arm64)

**Steps to reproduce:**
1. ...
2. ...
3. Run: `nimbus test SomeClassTest`

**Expected:** test passes
**Actual:** stack trace below

**`nimbus doctor` output:**
<paste here>

**Error / stack trace:**
<paste here>
```

For feature requests or general questions, prefer
[Discussions](https://github.com/nimbus-solution/nimbus-releases/discussions)
over Issues.

For security reports, please email **support@testnimbus.dev** directly
rather than opening a public issue.

---

## Releases & versioning

Nimbus follows [Semantic Versioning](https://semver.org/). Pre-1.0 releases
may include breaking changes between minor versions; the
[Changelog](https://testnimbus.dev/changelog) calls these out explicitly.

Each release here ships:

- Static binaries for `linux-amd64`, `linux-arm64`, `darwin-amd64`, `darwin-arm64`, `windows-amd64`.
- A `SHA256SUMS` file (the install script verifies against this).
- Release notes summarizing changes; the full changelog lives on the website.

---

## License

Nimbus is commercial software with a free tier. See
**[testnimbus.dev/#pricing](https://testnimbus.dev/#pricing)** for tier
details. License terms ship with each release; see
**[testnimbus.dev/terms](https://testnimbus.dev/terms)** for the canonical
text.

---

## Community

Join the Discord to ask questions, share what you're building, and report
weird Apex you'd like Nimbus to handle:
**[discord.gg/AYGAytExg](https://discord.gg/AYGAytExg)**.

For one-off questions you'd rather not have indexed, GitHub
[Discussions](https://github.com/nimbus-solution/nimbus-releases/discussions)
also works.

---

## Stay in touch

- Website: [testnimbus.dev](https://testnimbus.dev)
- Discord: [discord.gg/AYGAytExg](https://discord.gg/AYGAytExg)
- Contact: contact@testnimbus.dev
- Support & security reports: support@testnimbus.dev
