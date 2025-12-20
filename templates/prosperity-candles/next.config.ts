import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
	sassOptions: {
		additionalData: `@reference "${path.resolve("./src/app/globals.css")}";`,
	},
	/* config options here ${path.resolve("./src/app/globals.css")} */
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "3000",
			},
		],
	},
};

export default nextConfig;
