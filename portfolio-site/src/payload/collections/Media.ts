import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import path from "path";
import type { CollectionConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	fields: [
		{
			name: "alt",
			type: "text",
			localized: true,
			//required: true,
		},
		{
			name: "blurDataURL",
			type: "text",
			admin: {
				readOnly: true,
			},
		},
		{
			name: "caption",
			type: "richText",
			localized: true,
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						FixedToolbarFeature(),
						InlineToolbarFeature(),
					];
				},
			}),
		},
	],
	hooks: {
		afterChange: [
			async ({ doc, req, operation }) => {
				// Запускаем обработку только при создании или если blurDataURL еще не сгенерирован
				// Флаг `context.preventRecursion` предотвращает бесконечный цикл при вызове update
				if (
					(operation === "create" || !doc.blurDataURL) &&
					doc.url &&
					!req.context.preventRecursion
				) {
					try {
						// Фетчим уже сохраненное изображение по его финальному URL
						// Если используете относительные URL, может потребоваться абсолютный URL (например, process.env.NEXT_PUBLIC_SERVER_URL + doc.url)
						const response = await fetch(doc.url);
						const arrayBuffer = await response.arrayBuffer();
						const buffer = Buffer.from(arrayBuffer);

						// Генерируем заглушку через Sharp
						const resizedBuffer = await sharp(buffer)
							.resize(10, 10, { fit: "inside" })
							.blur(2)
							.toFormat("webp", { quality: 20 })
							.toBuffer();

						const base64 = `data:image/webp;base64,${resizedBuffer.toString("base64")}`;

						// Обновляем документ, обязательно передавая контекст для защиты от зацикливания
						await req.payload.update({
							collection: "media",
							id: doc.id,
							data: {
								blurDataURL: base64,
							},
							req,
							context: {
								preventRecursion: true,
							},
						});
					} catch (err) {
						req.payload.logger.error(
							`Error generating blur base64 via fetch: ${err}`,
						);
					}
				}
			},
		],
	},

	upload: {
    disableLocalStorage: true,
		// Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
		staticDir: path.resolve(dirname, "../../../public/media"),
		adminThumbnail: "thumbnail",
		focalPoint: true,
		imageSizes: [
			{
				name: "thumbnail",
				width: 300,
			},
			{
				name: "square",
				width: 500,
				height: 500,
			},
			{
				name: "small",
				width: 600,
			},
			{
				name: "medium",
				width: 900,
			},
			{
				name: "large",
				width: 1400,
			},
			{
				name: "xlarge",
				width: 1920,
			},
			{
				name: "og",
				width: 1200,
				height: 630,
				crop: "center",
			},
		],
	},
};

// import type { CollectionConfig } from "payload";
// import sharp from "sharp";

// export const Media: CollectionConfig = {
// 	slug: "media",
// 	upload: {
// 		staticDir: "media",
// 		imageSizes: [
// 			{
// 				name: "thumbnail",
// 				width: 400,
// 				height: 300,
// 				position: "centre",
// 			},
// 		],
// 		adminThumbnail: "thumbnail",
// 		mimeTypes: ["image/*"],
// 	},
// 	fields: [
// 		{
// 			name: "alt",
// 			type: "text",
// 			required: true,
// 		},
// 		{
// 			name: "blurDataURL",
// 			type: "text",
// 			admin: {
// 				readOnly: true,
// 			},
// 		},
// 	],

// };
