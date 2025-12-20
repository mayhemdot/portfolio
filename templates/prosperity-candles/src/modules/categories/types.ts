export interface Category {
	id: number;
	title?: string | null;
	parent?: (number | null) | Category;
	breadcrumbs?:
		| {
				doc?: (number | null) | Category;
				url?: string | null;
				label?: string | null;
				id?: string | null;
		  }[]
		| null;
	updatedAt: string;
	createdAt: string;
}
