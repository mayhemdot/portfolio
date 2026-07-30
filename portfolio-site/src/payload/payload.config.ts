import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig, type PayloadRequest } from "payload";
import sharp from "sharp"; // sharp-import
import { fileURLToPath } from "url";
import { defaultLexical } from "@/payload/fields/defaultLexical";
import localization from "../i18n/localization";
import { getServerSideURL } from "../utilities/getURL";
import { Footer } from "./blocks/Footer/config";
import { Header } from "./blocks/Header/config";
import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Projects } from "./collections/Projects";
import { Users } from "./collections/Users";
import { plugins } from "./plugins";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		components: {
			// The `BeforeLogin` component renders a message that you see while logging into your admin panel.
			// Feel free to delete this at any time. Simply remove the line below.
			beforeLogin: ["@/shared/components/BeforeLogin"],
			// The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
			// Feel free to delete this at any time. Simply remove the line below.
			beforeDashboard: ["@/shared/components/BeforeDashboard"],
		},
		importMap: {
			baseDir: path.resolve(dirname),
		},
		user: Users.slug,
		livePreview: {
			breakpoints: [
				{
					label: "Mobile",
					name: "mobile",
					width: 375,
					height: 667,
				},
				{
					label: "Tablet",
					name: "tablet",
					width: 768,
					height: 1024,
				},
				{
					label: "Desktop",
					name: "desktop",
					width: 1440,
					height: 900,
				},
			],
		},
	},
	localization: localization as any,
	// This config helps us configure global or default features that the other editors can inherit
	editor: defaultLexical,
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || "",
		},
	}),
	collections: [Pages, Projects, Media, Categories, Users],
	cors: [getServerSideURL()].filter(Boolean),
	globals: [Header, Footer],
	plugins: [
		...plugins,
		vercelBlobStorage({
			enabled:
				Boolean(process.env.BLOB_READ_WRITE_TOKEN) &&
				process.env.VERCEL_BLOB_ENABLED !== "false",
			collections: {
				media: true,
			},
			token: process.env.BLOB_READ_WRITE_TOKEN,
		}),
	],
	secret: process.env.PAYLOAD_SECRET,
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	jobs: {
		access: {
			run: ({ req }: { req: PayloadRequest }): boolean => {
				// Allow logged in users to execute this endpoint (default)
				if (req.user) return true;

				// If there is no logged in user, then check
				// for the Vercel Cron secret to be present as an
				// Authorization header:
				const authHeader = req.headers.get("authorization");
				return authHeader === `Bearer ${process.env.CRON_SECRET}`;
			},
		},
		tasks: [],
	},
});
