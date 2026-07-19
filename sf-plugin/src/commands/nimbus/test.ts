import { NimbusCommand } from '../../nimbus-command.js';

export default class NimbusTest extends NimbusCommand {
  public static override readonly aliases = ['nimbus apex run test'];
  public static override readonly description = 'Passes all arguments through to `nimbus test`. Installs the Nimbus runtime automatically when needed.';
  public static override readonly examples = [
    'sf nimbus test',
    'sf nimbus test AccountServiceTest',
    'sf nimbus test "AccountServiceTest.testInsert" --coverage',
    'sf nimbus apex run test "*" --parallel 8',
  ];
  public static override readonly summary = 'Run Apex tests locally with Nimbus.';

  public async run(): Promise<void> {
    await this.executeNimbus(['test']);
  }
}
