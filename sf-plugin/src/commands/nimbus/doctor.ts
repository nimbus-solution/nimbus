import { NimbusCommand } from '../../nimbus-command.js';

export default class NimbusDoctor extends NimbusCommand {
  public static override readonly examples = ['sf nimbus doctor', 'sf nimbus doctor --json'];
  public static override readonly summary = 'Diagnose Nimbus project setup.';

  public async run(): Promise<void> {
    await this.executeNimbus(['doctor']);
  }
}
