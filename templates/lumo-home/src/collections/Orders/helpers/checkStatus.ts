export function IsWaitingForCapture(status?: string) {
  if (!status) return false
  return status === 'waiting_for_capture'
}

export function IsPending(status?: string) {
  if (!status) return false
  return status === 'pending'
}

export function IsCancelled(status?: string) {
  if (!status) return false
  return status === 'cancelled'
}

export function IsShipped(status?: string) {
  if (!status) return false
  return status === 'shipped'
}

export function IsRefundRequested(status?: string) {
  if (!status) return false
  return status === 'refund_requested'
}
export function IsPaid(status?: string) {
  if (!status) return false
  return status === 'paid'
}
