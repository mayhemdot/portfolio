export function pushUnique<T>(items: T[], item: T): T[] {
  if (items.indexOf(item) === -1) {
    items.push(item)
  }
  return items
}
