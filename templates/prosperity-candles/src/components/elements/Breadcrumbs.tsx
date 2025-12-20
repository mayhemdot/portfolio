import Link from "next/link";
import type { HtmlHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface BreadcrumbsProps extends HtmlHTMLAttributes<HTMLDivElement> {
	breadcrumbs: IBreadcrumb[];
	classNameWrapper?: string;
}

interface IBreadcrumb {
	id: number;
	name: string;
	href: string;
}

export const Breadcrumbs = ({
	breadcrumbs,
	className,
	classNameWrapper,
}: BreadcrumbsProps) => {
	return (
		<nav
			aria-label='breadcrumb'
			className={cn(
				"fl-px-8/96 mx-auto w-full max-w-full pb-4 pt-4",
				classNameWrapper
			)}
		>
			<ol
				className={cn(
					"fsSmall text-dark-color flex items-center space-x-2 lg:mb-4",
					className
				)}
			>
				{breadcrumbs.map((breadcrumb: IBreadcrumb, i: number) => (
					<li key={breadcrumb.href}>
						<div className='flex items-center'>
							<Link
								href={breadcrumb.href}
								className={cn("text-muted-foreground font-medium", {
									["hover:text-gray-900"]: i !== breadcrumbs.length - 1,
								})}
							>
								{breadcrumb.name}
							</Link>
							{i !== breadcrumbs.length - 1 ? (
								<svg
									viewBox='0 0 20 20'
									fill='currentColor'
									aria-hidden='true'
									className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'
								>
									<path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
								</svg>
							) : null}
						</div>
					</li>
				))}
			</ol>
		</nav>
	);
};
