import { NimbusCommand } from '../../nimbus-command.js';

export default class NimbusDev extends NimbusCommand {
  public static override readonly examples = ['sf nimbus dev'];
  public static override readonly summary = 'Open the Nimbus local development UI.';

  public async run(): Promise<void> {
    await this.executeNimbus(['dev']);
  }
}
