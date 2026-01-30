export const restApi = async <T>(url: string, init?: RequestInit) => {

  if (!url.startsWith('http')) {
    url = process.env.NEXT_PUBLIC_SERVER_URL + url
  }
  // console.log('[restApi] Request URL: ', url)
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  // console.log(response.status)
  // if (!response.ok) {
  //   try {
  //     const parseError = await response.json()

  //     console.log('response', parseError)

  //     throw new Error('Something went wrong!')
  //   } catch (e: unknown) {
  //     throw new Error(response?.statusText || `HTTP Error! Status: ${response.status}`)
  //   }
  // }

  return (await response.json()) as Promise<T>
}

// const TELEGRAM_API_URL = 'https://api.telegram.org'
