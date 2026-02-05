import { MediaType } from "@/shared/components/Media/types";

type HomeArgs = {
	heroImage?: MediaType;
	metaImage?: MediaType;
};

export const home: (args: HomeArgs) => any = ({ heroImage, metaImage }) => {
	return {
		slug: "home",
		_status: "published",
		title: "Home",
		heroImage,
		metaImage,
		breadcrumbs: [
			{
				url: "/",
				label: "Home",
				slug: "home",
				title: "Home",
			},
		],
		layout: [
			{
				blockType: "cta",
				id: "callToAction",
				links: [],
				blockName: "Call to Action",
				Text: TextHeading({ text: "Call to Action" }),
			} as any,
		],
		hero: {
			type: "none",
			links: [],
			//   media: heroImage,
		},
	};
};

function TextHeading({ text }: { text: string }) {
	return {
		root: {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							detail: 0,
							format: 0,
							mode: "normal",
							style: "",
							text: text,
							version: 1,
						},
					],
					direction: "ltr",
					format: "",
					indent: 0,
					tag: "h2",
					version: 1,
				},
			],
			direction: "ltr",
			format: "",
			indent: 0,
			version: 1,
		},
	};
}
