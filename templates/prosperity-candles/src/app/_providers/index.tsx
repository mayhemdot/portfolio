"use client";

import type React from "react";
// import { AuthProvider } from "./Auth";
// import { CartProvider } from "./Cart";
import { ThemeProvider } from "./Theme";

// const queryClient = new QueryClient();

export const Providers: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<ThemeProvider>
			{/* <ReactQueryProvider> */}
			{/* <AuthProvider> */}
			{children}
			{/* </AuthProvider> */}
			{/* </ReactQueryProvider> */}
		</ThemeProvider>
	);
};

// export function ReactQueryProvider({
// 	children,
// }: {
// 	children: React.ReactNode;
// }) {
// 	return (
// 		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// 	);
// }
