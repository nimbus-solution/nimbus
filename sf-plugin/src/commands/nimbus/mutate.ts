import { NimbusCommand } from '../../nimbus-command.js';

export default class NimbusMutate extends NimbusCommand {
  public static override readonly description = 'Passes all arguments through to `nimbus mutate`.';
  public static override readonly examples = ['sf nimbus mutate AccountService --min-score 80', 'sf nimbus mutate --class "*Service" --survivors-only'];
  public static override readonly summary = 'Measure Apex test quality with mutation testing.';

  public async run(): Promise<void> {
    await this.executeNimbus(['mutate']);
  }
}
