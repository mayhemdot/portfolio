export function formatDate(date: string, lang: 'ru-RU' | 'en-US' = 'ru-RU') {
  return new Date(date).toLocaleDateString(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
