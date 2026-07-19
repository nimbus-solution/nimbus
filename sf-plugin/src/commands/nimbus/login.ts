import { NimbusCommand } from '../../nimbus-command.js';

export default class NimbusLogin extends NimbusCommand {
  public static override readonly examples = ['sf nimbus login'];
  public static override readonly summary = 'Sign in to Nimbus and activate a Pro license on this machine.';

  public async run(): Promise<void> {
    await this.executeNimbus(['login']);
  }
}
