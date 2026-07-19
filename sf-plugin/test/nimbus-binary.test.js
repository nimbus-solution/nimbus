import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { releaseAssetName } from '../lib/nimbus-binary.js';

describe('releaseAssetName', () => {
  it('maps macOS arm64 releases', () => {
    assert.equal(releaseAssetName('darwin', 'arm64', '1.6.1'), 'nimbus_1.6.1_darwin_arm64.tar.gz');
  });

  it('maps Linux x64 releases', () => {
    assert.equal(releaseAssetName('linux', 'x64', '1.6.1'), 'nimbus_1.6.1_linux_amd64.tar.gz');
  });

  it('maps Windows x64 releases', () => {
    assert.equal(releaseAssetName('win32', 'x64', '1.6.1'), 'nimbus_1.6.1_windows_amd64.zip');
  });
});
