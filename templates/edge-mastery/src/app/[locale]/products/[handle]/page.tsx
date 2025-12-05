import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import LayoutWithBreadcrumbs from "@/modules/common/components/LayoutWithBreadcrumbs";
import {
	getCountryCodeFromLocale,
	getLanguageFromLocale,
} from "@/modules/common/lib/get-region";
import {
	getRegion,
	listRegions,
	type StoreRegion,
} from "@/modules/common/lib/get-region-action";
import { listProducts } from "@/modules/products/actions/listProducts";
import { retrieveCustomer } from "@/modules/users/actions/retriveCustomer";
import { generateProductMeta } from "@/shared/utils/_generateMeta";
import ProductClient from "./page.client";

type Props = {
	params: Promise<{ locale: string; handle: string }>;
};

export default async function ({ params }: Props) {
	const { locale = routing.defaultLocale, handle } = await params;

	const countryCode = getCountryCodeFromLocale(locale);
	const region = await getRegion(countryCode);
	const t = await getTranslations({
		locale: locale,
	});

	if (!region) {
		notFound();
	}

	const pricedProduct = await listProducts({
		locale: locale,
		queryParams: { handle },
	}).then(({ response }) => response.products[0]);

	// console.log("pricedProduct", pricedProduct);
	if (!pricedProduct) {
		notFound();
	}

	const isWishlisted: boolean = await retrieveCustomer()
		.catch(() => null)
		.then(data => !!data);

	return (
		<LayoutWithBreadcrumbs
			breadcrumbs={[
				{
					id: "0",
					label: t("breadcrumbs.home") || "Home",
					url: `/`,
				},
				{
					id: "1",
					label: t("breadcrumbs.catalog") || "Catalog",
					url: `/products`,
				},
				{
					label: pricedProduct.title,
					url: `!`, ///products/${pricedProduct.handle}
					id: pricedProduct.id,
				},
			]}
		>
			<ProductClient
				product={pricedProduct}
				region={region}
				locale={locale}
				isWishlisted={isWishlisted}
			/>
		</LayoutWithBreadcrumbs>
	);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale = routing.defaultLocale, handle } = await params;
	const countryCode = getCountryCodeFromLocale(locale);
	const lang = getLanguageFromLocale(locale);

	const region = await getRegion(countryCode);

	if (!region) {
		notFound();
	}

	const product = await listProducts({
		locale: locale,
		queryParams: { handle },
	}).then(({ response }) => response.products[0]);

	if (!product) {
		notFound();
	}

	return generateProductMeta({
		title: product.title,
		imgSrc: product.thumbnail,
		description: product.description?.[lang],
	});
}

export async function generateStaticParams() {
	try {
		const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
			regions?.flatMap(r => r.countries?.map(c => c.iso_2))
		);

		if (!countryCodes?.length) {
			return [];
		}

		const products = await listProducts({
			locale: routing.defaultLocale,
			queryParams: { fields: "handle" },
		}).then(({ response }) => response.products);

		return countryCodes
			.flatMap(countryCode =>
				products.map(product => ({
					countryCode,
					handle: product.handle,
				}))
			)
			.filter(param => param.handle);
	} catch (error) {
		console.error(
			`Failed to generate static paths for product pages: ${
				error instanceof Error ? error.message : "Unknown error"
			}.`
		);
		return [];
	}
}
