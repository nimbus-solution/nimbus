import { SfCommand } from '@salesforce/sf-plugins-core';

import { ensureNimbusBinary } from './nimbus-binary.js';
import { runNimbus } from './run-nimbus.js';

export abstract class NimbusCommand extends SfCommand<void> {
  public static override strict = false;

  protected async executeNimbus(command: string[]): Promise<void> {
    const binary = await ensureNimbusBinary(this.config.dataDir);
    const forwardedArguments = this.argv[0] === '--' ? this.argv.slice(1) : this.argv;
    const exitCode = await runNimbus(binary, [...command, ...forwardedArguments]);
    if (exitCode !== 0) this.exit(exitCode);
  }
}
