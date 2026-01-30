export type YooPayment = {
  id: string //"2ff67559-000f-5000-8000-1bb486fd3253",
  status: string //"canceled",
  amount: { value: string; currency: 'RUB' }
  recipient: { account_id: string; gateway_id: string }
  payment_method: {
    type: 'bank_card'
    id: string //"2ff67559-000f-5000-8000-1bb486fd3253";
    saved: boolean
    status: 'inactive'
  }
  created_at: string
  test: boolean
  paid: boolean
  refundable: boolean
  metadata: {}
  cancellation_details: {
    party: string //"yoo_money";
    reason: string //"expired_on_confirmation";
  }
  //   status: "canceled",
  //   amount: { value: "6929.00", currency: "RUB" },
  //   recipient: { account_id: "1116378", gateway_id: "2484343" },
  //   payment_method: {
  //     type: "bank_card",
  //     id: "2ff67559-000f-5000-8000-1bb486fd3253",
  //     saved: false,
  //     status: "inactive",
  //   },
  //   created_at: "2025-07-01T22:30:49.192Z",
  //   test: true,
  //   paid: false,
  //   refundable: false,
  //   metadata: {},
  //   cancellation_details: {
  //     party: "yoo_money",
  //     reason: "expired_on_confirmation",
  //   },
}

export type PaymentNotification = {
  type: 'notification'
  event: string //"payment.succeeded";
  object: {
    id: string
    status: 'succeeded' | 'pending' | 'canceled' | 'waiting_for_capture'
    amount: {
      value: string
      currency: string
    }
    income_amount: {
      value: string
      currency: string
    }
    recipient: {
      account_id: string
      gateway_id: string
    }
    payment_method: {
      type: 'bank_card'
      id: string
      saved: boolean
      status: 'inactive' | 'active'
      title: string
      card: {
        first6?: string
        last4?: string
        expiry_month?: string
        expiry_year?: string
        card_type?: string
        issuer_country?: string
        issuer_name?: string
      }
    }
    captured_at: string // ISO date string
    created_at: string // ISO date string
    test: boolean
    refunded_amount: {
      value: string
      currency: string
    }
    paid: boolean
    refundable: boolean
    metadata: Record<string, any>
    authorization_details: {
      rrn: string
      auth_code: string
      three_d_secure: {
        applied: boolean
      }
    }
  }
}
