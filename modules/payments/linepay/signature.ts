import { createHmac } from 'node:crypto';

export function createLinePaySignature(input: { channelSecret: string; uri: string; body: string; nonce: string }) {
  const message = `${input.channelSecret}${input.uri}${input.body}${input.nonce}`;
  return createHmac('sha256', input.channelSecret).update(message).digest('base64');
}
