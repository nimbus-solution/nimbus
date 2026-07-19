import { NimbusCommand } from '../../nimbus-command.js';

export default class NimbusValidate extends NimbusCommand {
  public static override readonly aliases = ['nimbus apex validate'];
  public static override readonly description = 'Passes all arguments through to `nimbus validate`, including --sema and --json.';
  public static override readonly examples = ['sf nimbus validate', 'sf nimbus validate AccountService --sema error', 'sf nimbus apex validate --json'];
  public static override readonly summary = 'Detect Apex deployment errors locally with Nimbus.';

  public async run(): Promise<void> {
    await this.executeNimbus(['validate']);
  }
}
