import { Filter, ListFilter, X } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import CatalogFilter from "@/modules/products/ui/product-list/CatalogFilter";

type Props = {
	categories: any;
	limits: any;
};

export function CatalogFilterMobile({ categories, limits }: Props) {
	const [open, setOpen] = React.useState(false);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					aria-label='Фильтр'
					variant={"primary"}
					size={"lg"}
					className='px-4 lg:px-8'
					aria-haspopup={true}
				>
					{open ? <X className='size-4' /> : <ListFilter className='size-4' />}
					<span className='ml-2 hidden lg:block'>Фильтр</span>
					<span className='sr-only'>Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent className='min-w-64 backdrop-blur-xl! bg-card border-0 px-0'>
				<SheetHeader className='px-8'>
					<SheetTitle className='fsMiddle'>Фильтры</SheetTitle>
				</SheetHeader>
				<CatalogFilter
					position='sidebar'
					className='w-full max-w-full bg-transparent px-0'
					categories={categories}
					priceAvailable={limits}
				/>
			</SheetContent>
		</Sheet>
	);
}
