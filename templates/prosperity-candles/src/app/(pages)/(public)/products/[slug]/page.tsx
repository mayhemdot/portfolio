import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/elements/Breadcrumbs";
import { PRODUCTS } from "@/modules/products/queries";
import { ProductCardProvider } from "@/modules/products/ui/product-card/ProductCardContext";
import ProductCardForm from "@/modules/products/ui/product-card/ProductCardForm";
import ProductCardSlider from "@/modules/products/ui/product-card/ProductCardSlider";
import ProductThumbnails from "@/modules/products/ui/product-card/ProductThumbnails";
import { generateMeta } from "@/utilities/generateMeta";

export const dynamic = "force-dynamic";

type Args = {
	params: Promise<{ slug: string }>;
};

export default async function Product({ params }: Args) {
	const { slug } = await params;

	const product = PRODUCTS.find(product => product.slug === slug);

	if (!product) {
		notFound();
	}

	// const { layout, relatedProducts } = product;

	return (
		<div className='mx-auto w-full'>
			<ProductCardProvider product={product}>
				<Breadcrumbs
					breadcrumbs={[
						{ id: 1, name: "Главная", href: "/" },
						{ id: 2, name: "Каталог", href: "/products" },
						{ id: 3, name: product.title, href: `` },
					]}
				/>
				<section className='content-section fl-gap-16/64 flex max-w-full flex-col justify-between lg:flex-row'>
					<div className='fl-gap-8/64 relative flex flex-auto grow'>
						<div className='absolute inset-0 z-10 h-full shrink-0 p-2 lg:relative lg:p-0'>
							<ProductThumbnails />
						</div>
						<div className='max-w-full flex-1 pb-4'>
							<ProductCardSlider />
						</div>
					</div>
					<ProductCardForm />
				</section>
			</ProductCardProvider>

			{/* 
        { product?.enablePaywall && ( <PaywallBlocks productSlug={slug as string} disableTopPadding />)} 
       */}

			{/* <Blocks
				disableTopPadding
				blocks={[
					{
						blockType: "relatedProducts",
						blockName: "Related Product",
						relationTo: "products",
						introContent: [
							{
								type: "h4",
								children: [
									{
										text: "Related Products",
									},
								],
							},
							// {
							//   type: 'p',
							//   children: [
							//     {
							//       text: 'The products displayed here are individually selected for this page. Admins can select any number of related products to display here and the layout will adjust accordingly. Alternatively, you could swap this out for the "Archive" block to automatically populate products by category complete with pagination. To manage related posts, ',
							//     },
							//     {
							//       type: 'link',
							//       url: `/admin/collections/products/${product.id}`,
							//       children: [
							//         {
							//           text: 'navigate to the admin dashboard',
							//         },
							//       ],
							//     },
							//     {
							//       text: '.',
							//     },
							//   ],
							// },
						],
						docs: relatedProducts as IProduct[],
					},
				]}
			/> */}

			{/* TODO: related products */}
		</div>
	);
}

export async function generateStaticParams() {
	return PRODUCTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
	const { slug } = await params;
	const product = PRODUCTS.find(product => product.slug === slug);

	return generateMeta({
		doc: {
			title: product?.title,
			meta: {
				title: product?.title || "Product",
				description: product?.description || "Description of product",
				image: product?.images?.[0],
			},
			slug: `/products/${slug}`,
		},
	});
}
