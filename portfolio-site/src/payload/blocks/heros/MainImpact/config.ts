import type { Field } from "payload";

export const MainImpactFields: Field[] = [
	{
		name: "subtitle",
		type: "text",
		label: "Subtitle / Tagline",
		localized: true,
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
