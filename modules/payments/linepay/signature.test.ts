import { describe, expect, it } from 'vitest';
import { createLinePaySignature } from './signature';

describe('createLinePaySignature', () => {
  it('creates stable HMAC SHA256 base64 signatures', () => {
    const signature = createLinePaySignature({
      channelSecret: 'secret',
      uri: '/v4/payments/request',
      body: '{"amount":100}',
      nonce: 'nonce-1',
    });

    expect(signature).toBe('JbL83sFXyURuI9Mzyb8rgjfQiVSFx52ElSSKpNGuWpo=');
  });
});
