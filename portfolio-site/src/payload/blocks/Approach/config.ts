import type { Block } from "payload";

export const Approach: Block = {
	slug: "approachBlock",
	interfaceName: "ApproachBlock",
	fields: [
		{
			name: "eyebrow",
			type: "text",
			defaultValue: "METHODOLOGY",
			label: "Eyebrow",
			localized: true,
		},
		{
			name: "title",
			type: "text",
			required: true,
			defaultValue: "Engineering High-End Digital Products",
			label: "Title",
			localized: true,
		},
		{
			name: "subtitle",
			type: "textarea",
			defaultValue:
				"How architecture, content management, and motion converge into a unified web experience.",
			label: "Subtitle",
			localized: true,
		},
		{
			name: "items",
			type: "array",
			minRows: 1,
			maxRows: 3,
			label: "Items",
			labels: {
				singular: "Item",
				plural: "Items",
			},
			fields: [
				{
					name: "badge",
					type: "text",
					label: "Badge",
					localized: true,
				},
				{
					name: "title",
					type: "text",
					required: true,
					label: "Title",
					localized: true,
				},
				{
					name: "description",
					type: "textarea",
					required: true,
					label: "Description",
					localized: true,
				},
			],
		},
	],
	labels: {
		singular: "Approach Block",
		plural: "Approach Blocks",
	},
};

export const ApproachBlock = Approach;
