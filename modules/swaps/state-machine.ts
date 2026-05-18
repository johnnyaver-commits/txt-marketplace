const transitions = {
  PROPOSED: ['COUNTERED', 'ACCEPTED', 'REJECTED', 'CANCELLED'],
  COUNTERED: ['ACCEPTED', 'REJECTED', 'CANCELLED'],
  ACCEPTED: ['SHIPPING_PENDING', 'DISPUTED'],
  SHIPPING_PENDING: ['SHIPPED_PARTIAL', 'SHIPPED_BOTH', 'DISPUTED'],
  SHIPPED_PARTIAL: ['SHIPPED_BOTH', 'RECEIVED_PARTIAL', 'DISPUTED'],
  SHIPPED_BOTH: ['RECEIVED_PARTIAL', 'COMPLETED', 'DISPUTED'],
  RECEIVED_PARTIAL: ['COMPLETED', 'DISPUTED'],
  COMPLETED: [],
  REJECTED: [],
  CANCELLED: [],
  DISPUTED: [],
} as const;

export type SwapStatus = keyof typeof transitions;

export function canTransitionSwap(from: SwapStatus, to: SwapStatus) {
  return (transitions[from] as readonly string[]).includes(to);
}
