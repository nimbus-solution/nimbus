import { NimbusCommand } from '../../nimbus-command.js';

export default class NimbusApp extends NimbusCommand {
  public static override readonly description = 'Runs Salesforce Multi-Framework UI bundles against the local Nimbus runtime.';
  public static override readonly examples = ['sf nimbus app', 'sf nimbus app reactRecipes', 'sf nimbus app --all'];
  public static override readonly summary = 'Run a Salesforce Multi-Framework app locally.';

  public async run(): Promise<void> {
    await this.executeNimbus(['app']);
  }
}
