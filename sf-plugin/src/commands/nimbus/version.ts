import { NimbusCommand } from '../../nimbus-command.js';

export default class NimbusVersion extends NimbusCommand {
  public static override readonly summary = 'Display the active Nimbus runtime version.';

  public async run(): Promise<void> {
    await this.executeNimbus(['--version']);
  }
}
