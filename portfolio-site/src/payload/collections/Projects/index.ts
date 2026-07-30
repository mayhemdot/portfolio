import type { CollectionConfig } from "payload";
import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
// projects
export const Projects: CollectionConfig = {
	slug: "projects",
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	defaultPopulate: {
		title: true,
		year: true,
		gallery: true,
		// meta: {
		//   image: true,
		//   description: true,
		// },
	},
	admin: {
		defaultColumns: ["title", "year", "gallery"],
		// livePreview: {
		//   url: ({ data, req }) =>
		//     generatePreviewPath({
		//       slug: data?.slug,
		//       collection: 'projects',
		//       req,
		//     }),
		// },
		// preview: (data, { req }) =>
		//   generatePreviewPath({
		//     slug: data?.slug as string,
		//     collection: 'projects',
		//     req,
		//   }),
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			type: "text",
			localized: true,
			required: true,
		},
		{
			name: "year",
			type: "text",
			required: true,
		},
		{
			name: "gallery",
			type: "array",
			minRows: 1,
			fields: [
				{
					name: "mediaItem",
					type: "upload",
					relationTo: "media",
					required: true,
				},
			],
		},
	],
};
