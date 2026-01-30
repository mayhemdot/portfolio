import dayjs from 'dayjs'

export function getDaysBetween(start: dayjs.Dayjs, end: dayjs.Dayjs) {
  const range = []
  let current = start
  while (!current.isAfter(end)) {
    range.push(current)
    current = current.add(1, 'days')
  }
  return range
}

export function hasGone(startDate: Date, days: number) {
  return dayjs(Date.now()) > dayjs(startDate).add(days, 'day')
}
