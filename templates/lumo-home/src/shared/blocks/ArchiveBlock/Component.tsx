import { LocaleCode } from "@/i18n/localization";
import { getProductsWhere } from "@/modules/products/queries/getProducts";
import { CollectionArchive } from "@/shared/components/CollectionArchive";
import { Text } from "@/shared/components/Text";
import { getLocale } from "next-intl/server";

type ArchiveBlockProps = {
	introContent: string;
	limit: number;
	populateBy: "products";
	selectedDocs: any[];
};

export const ArchiveBlock: React.FC<
	ArchiveBlockProps & {
		id?: string;
	}
> = async props => {
	const {
		id,
		introContent,
		limit: limitFromProps,
		populateBy,
		selectedDocs,
	} = props;

	const limit = limitFromProps || 3;
	const locale = (await getLocale()) as LocaleCode;
	const products = getProductsWhere({ localeCode: locale });

	return (
		<div className='my-16' id={`block-${id}`}>
			{introContent && (
				<div className='container mb-4 md:mb-8'>
					<Text className='ml-0 max-w-3xl'>{introContent}</Text>
				</div>
			)}
			<CollectionArchive
				products={products.docs.map(p => p.raw)}
				localeCode={locale}
			/>
		</div>
	);
};
