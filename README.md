# Nimbus — Local Apex Runtime & Test Runner

**Run, test, and debug Salesforce Apex locally. No org. No Docker. No JVM.**

Nimbus is a **local Apex runtime** for Salesforce. It executes Apex classes,
triggers, Flows, SOQL, and DML on your machine — against a real embedded
PostgreSQL database — so you can **run Apex tests locally without a Salesforce
org**. A typical test finishes in milliseconds, which makes Apex fast enough for
tight TDD loops, agent-driven development, and CI that doesn't depend on a
scratch org pool.

🌐 **[testnimbus.dev](https://testnimbus.dev)** &nbsp;·&nbsp;
📖 **[Docs](https://testnimbus.dev/docs)** &nbsp;·&nbsp;
🚀 **[Quickstart](https://testnimbus.dev/quickstart)** &nbsp;·&nbsp;
💬 **[Slack](https://join.slack.com/t/nimbuslocalap-tj23081/shared_invite/zt-3x7fxoo38-AAgO9QHP7if53JPunBxOPQ)**

---

## Why Nimbus

The Salesforce inner dev loop runs through an org. You change one line, push to a
scratch org or sandbox, wait minutes, and run your tests over the wire. Nimbus
removes the org from that loop:

- ⚡ **Tests in milliseconds**, not minutes — no deploy, no round-trip.
- 🗄️ **Real execution, not mocks** — SOQL runs as SQL against embedded
  PostgreSQL, DML persists, triggers fire, Flows execute.
- 🔌 **No org, no credentials, no Docker, no JVM** — a single binary, point it at
  your existing SFDX project and run. Works offline.
- 🤖 **Built for AI agents** — `nimbus mcp` exposes the test runner over MCP so
  Claude Code, Cursor, and Copilot can iterate in write-test-fix loops.
- 🧪 **Mutation testing** for Apex — verify your tests actually catch bugs.
- 🧰 **CI-native** — JUnit and Cobertura XML drop straight into GitHub Actions,
  GitLab CI, SonarQube, and Codecov.

## Install

**macOS / Linux**

```bash
curl -fsSL https://install.testnimbus.dev | sh
```

**Homebrew**

```bash
brew install nimbus-solution/nimbus/nimbus
```

**Windows (PowerShell)**

```powershell
irm https://testnimbus.dev/install.ps1 | iex
```

**Scoop**

```powershell
scoop bucket add nimbus https://github.com/nimbus-solution/scoop-nimbus
scoop install nimbus
```

## Quickstart

From the root of your SFDX project:

```bash
# Run every test
nimbus test "*"

# Run a class or method pattern
nimbus test "AccountServiceTest.*"

# With coverage (Cobertura XML) + JUnit XML test results for CI
nimbus test "*" --coverage-report coverage.xml --results-xml results.xml
```

A ready-to-copy GitHub Actions workflow lives in
[`examples/`](examples/) — see also the [CI/CD guide](https://testnimbus.dev/ci).

Nimbus reads your `sfdx-project.json`, finds your classes, triggers, and Flows,
and runs your real `@isTest` classes — the same ones that run on the platform.
No copying, no parallel project, no rewriting tests.

No project at hand? Clone
**[berlinbrew-demo](https://github.com/nimbus-solution/berlinbrew-demo)** — a
real-shape Salesforce DX project built to showcase Nimbus — and run
`nimbus test` in it.

Full guide: **[testnimbus.dev/quickstart](https://testnimbus.dev/quickstart)**

## What it supports

| Area | Coverage |
|------|----------|
| **Language** | Classes, interfaces, enums, inheritance, generics, exceptions, all annotations |
| **Data** | SOQL (WHERE, ORDER BY, LIMIT, aggregates, relationships, bind vars), DML (insert/update/delete/upsert/undelete) |
| **Automation** | Before/after triggers, record-triggered Flows, autolaunched Flows, subflows, platform-event Flows |
| **Testing** | `@isTest`, `@testSetup`, `System.assert*`, `Test.startTest/stopTest`, Stub API / ApexMocks, per-test transaction isolation |
| **Tooling** | Live debugger (DAP), standalone Language Server, browser Dev UI, watch mode, mutation testing, governor-limit enforcement |
| **CI** | JUnit XML, Cobertura XML, JSON, HTML coverage |
| **AI** | MCP server (`nimbus mcp`) for Claude Code, Cursor, Copilot |

Coverage expands every release — see the
**[changelog](https://testnimbus.dev/changelog)**.

## Editor support

The Nimbus Language Server is standalone, so it works beyond VS Code: **VS Code,
Cursor, Windsurf, Neovim, Zed, JetBrains, Emacs, Helix.** The
[VS Code extension](https://testnimbus.dev/vscode) is published to both the
Microsoft Marketplace and the
[Open VSX registry](https://open-vsx.org/extension/NimbusSolutions/testnimbus).

## How it compares

- **[vs scratch orgs](https://testnimbus.dev/compare/scratch-orgs)** — milliseconds vs minutes; no DevHub limits.
- **[vs ApexMocks / fflib](https://testnimbus.dev/compare/apexmocks)** — a real database vs stubbed return values.
- **[vs Apex Replay Debugger](https://testnimbus.dev/compare/replay-debugger)** — live breakpoints vs replaying a log.

## Pricing

Free for individual developers, forever. Pro and Team tiers add the daemon,
parallel execution, watch mode, the debugger, mutation testing, and CI.
**Free during the public beta** — see
**[pricing](https://testnimbus.dev/#pricing)**.

## Links

- Website — https://testnimbus.dev
- Documentation — https://testnimbus.dev/docs
- Quickstart — https://testnimbus.dev/quickstart
- FAQ — https://testnimbus.dev/faq
- Changelog — https://testnimbus.dev/changelog
- Demo project — https://github.com/nimbus-solution/berlinbrew-demo
- Agent skills for Apex — https://github.com/nimbus-solution/nimbus-skills

---

<sub>Nimbus is a local Apex test runner / Apex execution runtime for Salesforce
developers who want to run Apex tests locally without an org. Keywords for the
humans and the crawlers: local apex runtime, run apex tests locally, apex test
runner, salesforce apex without org, apex interpreter, local salesforce
development, apex CI without scratch org.</sub>
