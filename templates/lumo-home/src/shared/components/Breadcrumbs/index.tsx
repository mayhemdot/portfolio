import Link from "next/link";
import React from "react";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";

interface BreadcrumbProps {
  padding?: boolean
	breadcrumbs:
		| {
				doc?: (number | null) | any;
				url?: string | null;
				label?: string | null;
				id?: string | null;
		  }[]
		| null
		| undefined;
}

export function DynamicBreadcrumb({ breadcrumbs, padding = true }: BreadcrumbProps) {
	// We'll show max 3 items: first, last, and dropdown for middle items
	const maxItems = 4;
	const shouldCollapse = breadcrumbs?.length || 0 > maxItems;

	return (
		<Breadcrumb className={cn('my-4', { "fl-mx-16/32" : padding })}>
			<BreadcrumbList>
				{breadcrumbs?.map((crumb, index) => {
					// Always show first item
					if (index === 0) {
						return (
							<React.Fragment key={String(index)}>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link href={crumb?.url || "/"} className='fl-text-16/20'>
											{crumb?.label}
										</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</React.Fragment>
						);
					}

					// Show dropdown for middle items if there are too many
					if (shouldCollapse && index > 0 && index < breadcrumbs.length - 1) {
						if (index === 1) {
							return (
								<React.Fragment key={String(index)}>
									<BreadcrumbItem>
										<DropdownMenu>
											<DropdownMenuTrigger className='flex items-center gap-1'>
												<BreadcrumbEllipsis className='size-4' />
												<span className='sr-only'>Toggle menu</span>
											</DropdownMenuTrigger>
											<DropdownMenuContent align='start'>
												{breadcrumbs
													.slice(1, -1)
													.map((dropdownCrumb, dropdownIndex) => (
														<DropdownMenuItem key={String(dropdownIndex)}>
															<Link
																href={dropdownCrumb?.url!}
																className='fl-text-16/20'
															>
																{dropdownCrumb?.label}
															</Link>
														</DropdownMenuItem>
													))}
											</DropdownMenuContent>
										</DropdownMenu>
										{/* <BreadcrumbSeparator /> */}
									</BreadcrumbItem>
									<BreadcrumbSeparator />
								</React.Fragment>
							);
						}
						return null; // Skip other middle items as they're in dropdown
					}

					// Show last item as current page (no link)
					if (index === breadcrumbs.length - 1) {
						return (
							<BreadcrumbItem key={String(index)}>
								<BreadcrumbPage className='fl-text-16/20'>
									{crumb?.label}
								</BreadcrumbPage>
							</BreadcrumbItem>
						);
					}

					// Show regular items when not collapsed
					return (
						<BreadcrumbItem key={String(index)}>
							<BreadcrumbLink asChild>
								<Link href={crumb?.url!} className='fl-text-16/20'>
									{crumb?.label}
								</Link>
							</BreadcrumbLink>
							{/* <BreadcrumbSeparator /> */}
						</BreadcrumbItem>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
