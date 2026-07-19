import { NimbusCommand } from '../../nimbus-command.js';

export default class NimbusServe extends NimbusCommand {
  public static override readonly examples = ['sf nimbus serve', 'sf nimbus serve --addr 127.0.0.1:8080 --grpc-addr 127.0.0.1:7443'];
  public static override readonly summary = 'Start the local Salesforce-compatible REST and Pub/Sub server.';

  public async run(): Promise<void> {
    await this.executeNimbus(['serve']);
  }
}
