# Examples

Copy-paste starting points for running Apex tests locally with
[Nimbus](https://testnimbus.dev).

| Example | What it shows |
|---------|---------------|
| [`github-actions/apex-tests.yml`](github-actions/apex-tests.yml) | Apex tests + coverage in GitHub Actions — no org, no scratch-org pool |

## Want a full project to try?

Clone **[berlinbrew-demo](https://github.com/nimbus-solution/berlinbrew-demo)** —
a real-shape Salesforce DX project (subscriptions, trigger handlers, callout
mocks, bulk patterns) built to showcase Nimbus:

```bash
curl -fsSL https://install.testnimbus.dev | sh
git clone https://github.com/nimbus-solution/berlinbrew-demo
cd berlinbrew-demo
nimbus test
```

For GitLab CI, SonarQube, and Codecov setups see the
[CI/CD guide](https://testnimbus.dev/ci).
