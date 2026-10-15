# Examples

Copy-paste starting points for running Apex tests locally with
[Renmy](https://renmy.net).

| Example | What it shows |
|---------|---------------|
| [`github-actions/apex-tests.yml`](github-actions/apex-tests.yml) | Apex tests + coverage in GitHub Actions — no org, no scratch-org pool |

## Want a full project to try?

Clone **[berlinbrew-demo](https://github.com/renmy-solutions/berlinbrew-demo)** —
a real-shape Salesforce DX project (subscriptions, trigger handlers, callout
mocks, bulk patterns) built to showcase Renmy:

```bash
curl -fsSL https://install.renmy.net | sh
git clone https://github.com/renmy-solutions/berlinbrew-demo
cd berlinbrew-demo
renmy test
```

For GitLab CI, SonarQube, and Codecov setups see the
[CI/CD guide](https://renmy.net/ci).
