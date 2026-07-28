import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";
import { defaultSkills, defaultSkillsList } from "./defaultSkills";

export { defaultSkills, defaultSkillsList };

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

		{
			name: "skills",
			label: "Skills List",
			type: "array",
			fields: [
				{
					name: "category",
					type: "text",
					required: true,
					label: "Category Name",
				},
				{
					name: "items",
					type: "array",
					label: "Skills",
					fields: [
						{
							name: "name",
							type: "text",
							required: true,
							label: "Skill Name",
						},
					],
				},
			],
		},

		{
			name: "skillsList",
			label: "Skills List (Alias)",
			type: "array",
			admin: {
				hidden: true,
			},
			fields: [
				{
					name: "category",
					type: "text",
					required: true,
				},
				{
					name: "items",
					type: "array",
					fields: [
						{
							name: "name",
							type: "text",
							required: true,
						},
					],
				},
			],
		},
	],
};
