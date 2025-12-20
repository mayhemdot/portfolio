export function fetchField(src: any, field: string = 'id') {
  if (!src) return null
  return typeof src === 'object'
    ? src?.[field]
    : typeof src === 'string' || typeof src === 'number'
    ? src
    : null
}

export function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item)
}
