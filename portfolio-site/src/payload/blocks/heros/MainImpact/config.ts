import type { Field } from "payload";

export const MainImpactFields: Field[] = [
	{
		name: "eyebrow",
		type: "text",
		label: "Eyebrow",
		localized: true,
	},
	{
		name: "subtitle",
		type: "text",
		label: "Subtitle / Tagline",
		localized: true,
		// by Gorunoff Evgenii
		defaultValue: "",
	},
	{
		name: "items",
		type: "array",
		label: "Items / Disciplines",
		labels: {
			singular: "Item",
			plural: "Items",
		},
		fields: [
			{
				name: "value",
				type: "text",
				label: "Value",
				localized: true,
			},
			{
				name: "label",
				type: "text",
				label: "Label",
				localized: true,
			},
			{
				name: "description",
				type: "textarea",
				label: "Description",
				localized: true,
			},
		],
	},
];

// {
// 	name: "stats",
// 	type: "array",
// 	label: "Stats / Dynamic Metrics",
// 	labels: {
// 		singular: "Stat",
// 		plural: "Stats",
// 	},
// 	fields: [
// 		{
// 			name: "value",
// 			type: "text",
// 			label: "Value",
// 			localized: true,
// 		},
// 		{
// 			name: "label",
// 			type: "text",
// 			label: "Label",
// 			localized: true,
// 		},
// 		{
// 			name: "description",
// 			type: "textarea",
// 			label: "Description",
// 			localized: true,
// 		},
// 	],
// },
