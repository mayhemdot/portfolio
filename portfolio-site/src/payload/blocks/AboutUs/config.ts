import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const AboutUs: Block = {
	slug: "aboutUs",
	interfaceName: "AboutUs",
	fields: [
		{
			name: "title",
			type: "richText",
			localized: true,
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
						FixedToolbarFeature(),
						InlineToolbarFeature(),
					];
				},
			}),
			label: "Title",
		},
		{
			name: "description",
			type: "richText",
			localized: true,
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
						FixedToolbarFeature(),
						InlineToolbarFeature(),
					];
				},
			}),
			label: "Description",
		},
		{
			name: "media",
			type: "upload",
			relationTo: "media",
			required: true,
		},

		{
			name: "features",
			type: "array",
			fields: [
				{
					name: "feature",
					type: "richText",
					localized: true,
					editor: lexicalEditor({
						// features: ({ rootFeatures }) => {
						//   return [
						//     ...rootFeatures,
						//     HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
						//     FixedToolbarFeature(),
						//     InlineToolbarFeature(),
						//   ]
						// },
					}),
					label: "Feature",
				},
			],
		},
		{
			label: "Skills Title",
			name: "skillsTitle",
			type: "richText",
			localized: true,
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
						FixedToolbarFeature(),
						InlineToolbarFeature(),
					];
				},
			}),
		},

		{
			name: "skillsDescription",
			type: "richText",
			localized: true,
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
						FixedToolbarFeature(),
						InlineToolbarFeature(),
					];
				},
			}),
			label: "Skills Description",
		},

		// {
		//   name: 'description',
		//   type: 'text',
		//   required: true,
		// },
	],
};
