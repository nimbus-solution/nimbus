import { NimbusCommand } from '../../nimbus-command.js';

export default class NimbusExec extends NimbusCommand {
  public static override readonly aliases = ['nimbus apex run'];
  public static override readonly description = 'Passes files, inline code, and HTTP mock flags through to `nimbus exec`.';
  public static override readonly examples = ['sf nimbus exec script.apex', 'sf nimbus exec --code "System.debug(1 + 1);"'];
  public static override readonly summary = 'Execute anonymous Apex locally with Nimbus.';

  public async run(): Promise<void> {
    await this.executeNimbus(['exec']);
  }
}
