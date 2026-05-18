import { describe, expect, it } from 'vitest';
import { canTransitionSwap } from './state-machine';

describe('canTransitionSwap', () => {
  it('allows proposal acceptance', () => {
    expect(canTransitionSwap('PROPOSED', 'ACCEPTED')).toBe(true);
  });

  it('does not allow completed swap to reopen', () => {
    expect(canTransitionSwap('COMPLETED', 'DISPUTED')).toBe(false);
  });
});
