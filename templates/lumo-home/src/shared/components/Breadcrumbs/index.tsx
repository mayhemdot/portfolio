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

export type BreadcrumbType = {
	doc?: (number | null) | any;
	id?: string | null;
	label: string;
	url: string;
};

interface BreadcrumbProps {
	padding?: boolean;
	breadcrumbs?: BreadcrumbType[] | null;
}

export function DynamicBreadcrumb({
	breadcrumbs,
	padding = true,
}: BreadcrumbProps) {
	// We'll show max 3 items: first, last, and dropdown for middle items
	const maxItems = 4;

	const shouldCollapse = (breadcrumbs?.length || 0) > maxItems;
	console.log("shouldCollapse", shouldCollapse);
	return (
		<Breadcrumb className={cn("my-4", { "fl-mx-16/32": padding })}>
			<BreadcrumbList>
				{breadcrumbs?.map((crumb, index) => {
					// Always show first item
					if (index === 0) {
						return (
							<React.Fragment key={String(index)}>
								<BreadcrumbItem>
									<BreadcrumbLink href='/' className='fl-text-16/20'>
										{crumb?.label}
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
												<BreadcrumbEllipsis className='icon-size' />
												<span className='sr-only'>Toggle menu</span>
											</DropdownMenuTrigger>
											<DropdownMenuContent align='start'>
												{breadcrumbs
													.slice(1, -1)
													.map((dropdownCrumb, dropdownIndex) => (
														<DropdownMenuItem key={String(dropdownIndex)}>
															<Link
																href={dropdownCrumb?.url}
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
							<React.Fragment key={String(index)}>
								{/* {!shouldCollapse && <BreadcrumbSeparator />} */}
								<BreadcrumbItem>
									<BreadcrumbPage className='fl-text-16/20'>
										{crumb?.label}
									</BreadcrumbPage>
								</BreadcrumbItem>
							</React.Fragment>
						);
					}

					// Show regular items when not collapsed
					return (
						<React.Fragment key={String(index)}>
							<BreadcrumbItem>
								<BreadcrumbLink href={crumb?.url} className='fl-text-16/20'>
									{crumb?.label}
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</React.Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
