import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const LetsTalkBlock: Block = {
	slug: "letsTalkSection",
	interfaceName: "LetsTalkBlock",
	labels: {
		singular: "Let's Talk Section",
		plural: "Let's Talk Sections",
	},
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
			name: "subtitle",
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
			label: "Subtitle",
		},
		{
			name: "media",
			type: "upload",
			relationTo: "media",
			label: "Background Media",
		},
	],
};
