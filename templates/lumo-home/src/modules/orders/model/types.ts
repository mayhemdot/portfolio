export const STATUS = {
  pending: 'pending',
  waiting_for_capture: 'waiting_for_capture',
  refund_requested: 'refund_requested',
  canceled: 'cancelled',
  cancelled: 'cancelled',
  succeeded: 'succeeded',
  shipped: 'shipped' as const,
  paid: 'paid',
} as const
