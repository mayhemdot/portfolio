export const restApi = async <T>(url: string, init?: RequestInit) => {
	const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + url, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...init?.headers,
		},
	});

	// if (!response.ok) {
	//   throw new Error(response.statusText) //(response as any)?.errors ||
	// }

	return (await response.json()) as Promise<T>;
};
