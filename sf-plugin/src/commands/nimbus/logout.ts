import { NimbusCommand } from '../../nimbus-command.js';

export default class NimbusLogout extends NimbusCommand {
  public static override readonly examples = ['sf nimbus logout'];
  public static override readonly summary = 'Sign out of Nimbus and free this machine license activation.';

  public async run(): Promise<void> {
    await this.executeNimbus(['logout']);
  }
}
