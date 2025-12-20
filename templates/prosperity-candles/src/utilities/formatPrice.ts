export function formatPrice({
  total,
  currency = 'USD',
  region = 'en-US',
}: {
  total: number
  currency?: string
  region?: string
}) {
  return new Intl.NumberFormat(region, {
    style: 'currency',
    currency: currency,
  }).format(total / 100)
}
