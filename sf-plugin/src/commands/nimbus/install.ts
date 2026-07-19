import { Flags, SfCommand } from '@salesforce/sf-plugins-core';

import { installNimbus } from '../../nimbus-binary.js';

export type NimbusInstallResult = { path: string; version: string };

export default class NimbusInstall extends SfCommand<NimbusInstallResult> {
  public static override readonly examples = ['sf nimbus install', 'sf nimbus install --version 1.6.1', 'sf nimbus install --force'];
  public static override readonly flags = {
    force: Flags.boolean({ summary: 'Download the runtime even when a managed Nimbus binary already exists.' }),
    version: Flags.string({ default: 'latest', summary: 'Nimbus version to install, or latest.' }),
  };
  public static override readonly summary = 'Install or update the Nimbus runtime managed by the Salesforce CLI plugin.';

  public async run(): Promise<NimbusInstallResult> {
    const { flags } = await this.parse(NimbusInstall);
    const result = await installNimbus({ dataDir: this.config.dataDir, force: flags.force, version: flags.version });
    this.log(`Nimbus v${result.version} installed to ${result.path}`);
    return result;
  }
}
