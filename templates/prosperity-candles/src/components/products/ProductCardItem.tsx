import { ImageIcon } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Media } from "@/components/Media";
import { Price } from "@/components/Price";
import { cn } from "@/lib/utils";
import { ROOT_DIR } from "@/modules/common/data/constants";
import type {
	StoreProduct,
	StoreProductVariant,
} from "@/modules/products/types";

type Props = {
	product: StoreProduct;
	className?: string;
	variant: StoreProductVariant;
};

const ProductCardItem = ({ product, variant, className }: Props) => {
	// const { base64, img } = await getPlaiceholder("/path-to-your-image.jpg");
	const { id, title, slug } = product;
	const url = product.images?.[0]?.url;
	// const image = meta?.image as Media; //?.find(image => image.is_banner)
	console.log(product);

	// const { description, image: metaImage } = meta || {};
	// const image = metaImage as Media;
	// console.log(description, metaImage);
	//   const image: Media | undefined | null =
	//   imageBanner ?? (images.length > 0 ? images[0] : undefined)
	//   const details = product.productdetails;
	//   const d = product.productdetails;
	//   const { size } = details[0];
	//   const [sizeId, setSizeId] = useState(size?.id);
	//   const productDetail = details.find((pd) => pd.size.id === sizeId);
	return (
		<div
			key={id || title}
			className={cn(
				"align-center min-h-96 group flex h-full w-full flex-col gap-2 md:gap-4",
				className
			)}
		>
			<a
				href={`${ROOT_DIR}/card/${slug}`}
				className='relative h-full w-full overflow-hidden rounded-xl'
			>
				{url ? (
					typeof url !== "string" && (
						<Media
							imgClassName={
								"object-cover transition-transform duration-700 group-hover:scale-110"
							}
							resource={url}
							fill
						/>
					)
				) : (
					<div className='flex h-full w-full items-center justify-center rounded-xl border border-dark-color '>
						<ImageIcon className='h-12 w-12 text-dark-color' />
					</div>
				)}
			</a>
			<div className={"fsNormal grid w-full grid-cols-1 md:grid-cols-6"}>
				<h3 className={"col-span-6 mb-4 line-clamp-2 "}>{product.title}</h3>
				<div className='col-span-6 mb-2 flex w-full justify-between gap-4'>
					{/* {details.map((d) => (
            <div
              key={d.id}
              className={cn("fsSmall digits flex h-9 w-12 flex-1 cursor-pointer items-center justify-center rounded-xl bg-beige-color py-1 text-center", {
                "bg-dark-color text-white": sizeId === d.size.id,
              })}
              onClick={() => setSizeId(d.size.id)}
            >
              {typeof d.size === "object" ? `${d.size.size} ${d.size.unit}` : d.size}
            </div>
          ))} */}
				</div>
				<div className='fsSmall relative col-span-6 flex h-12 w-full items-center justify-between rounded-2xl bg-beige-color pl-4 pr-2'>
					<h3 className={"digits flex items-center gap-1"}>
						<Price variant={variant} button={false} />
					</h3>
					<AddToCartButton variant={variant} product={product} />
				</div>
			</div>
		</div>
	);
};

export default ProductCardItem;

// <Image
//   src={image.url}
//   placeholder="blur"
//   blurDataURL={image.url} //"/src/media/products/"
//   fill
//   className=""
//   alt={image.alt || `Изображение продукта ${product.title}`}
// />
// {!metaImage && <div>No image</div>}
