import { NimbusCommand } from '../../nimbus-command.js';

export default class NimbusWhoami extends NimbusCommand {
  public static override readonly examples = ['sf nimbus whoami'];
  public static override readonly summary = 'Show the active Nimbus account and license status.';

  public async run(): Promise<void> {
    await this.executeNimbus(['whoami']);
  }
}
