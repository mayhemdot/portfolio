import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { type ComponentProps, Fragment } from "react";
import { Icons } from "@/components/icons/Icons";
import { Video } from "@/components/Media/Video";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import classes from "./index.module.scss";

type LinkProps = ComponentProps<typeof Link> & {
	label?: string;
	size?: VariantProps<typeof buttonVariants>["size"];
	variant?: VariantProps<typeof buttonVariants>["variant"];
};

export const MainImpactHero = ({
	media,
	links,
}: {
	media: any;
	links: LinkProps[];
}) => {
	return (
		<section className='hero min-h-screen-minus-header max-w-full! mx-auto flex h-full w-full overflow-hidden lg:mb-48'>
			<div className='mx-auto flex'>
				<div className='content relative z-20 h-fit self-center'>
					<div className='heroMain container relative z-10 flex h-auto items-center justify-center px-4 lg:px-20 2xl:px-0'>
						<div className='h-auto xl:mt-8'>
							<h1
								className={cn(
									"fl-text-46/200 fl-pb-8/60 font-romile relative flex flex-col gap-2 overflow-hidden font-normal leading-[0.8]"
								)}
							>
								<span className='relative flex items-start justify-between gap-4 overflow-hidden'>
									<span className='rowHide block translate-y-[120%]'>
										Свечи
									</span>
									<Subtitle className='hidden md:flex' />
								</span>
								<span className='rowHide block translate-y-[120%] transform leading-none'>
									Ароматические
								</span>
							</h1>
							<span className='mb-8 block overflow-hidden md:mb-0 md:hidden'>
								<Subtitle className='visible block md:invisible' />
							</span>

							<div className='mx-auto flex items-center gap-2 md:-translate-x-[15%]'>
								{links?.map((link, i: number) => (
									<Link
										key={link.id}
										href={link.href}
										className={buttonVariants({
											variant: "round",
											size: i === 0 ? "dynamicBig" : "dynamicMini",
											className: cn(classes.gradient, "buttonRound scale-0"),
										})}
									>
										{link.label && i === 0 && (
											<span
												className={
													"fl-text-14/24! textButtonRound text-secondary-foreground prose! whitespace-nowrap opacity-0"
												}
											>
												{link.label}
											</span>
										)}
										{i > 0 && (
											<Icons.mail className='textButtonRound size-8 text-primary-foreground opacity-0' />
										)}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className='absolute inset-0 z-0'>
					{typeof media === "object" && (
						<Fragment>
							<Video
								resource={media}
								loop={false}
								priority
								videoClassName={cn(classes.video, "object-cover h-full")}
							/>
							{media?.caption && (
								<div className={classes.caption}>{media.caption}</div>
							)}
						</Fragment>
					)}
				</div>
			</div>
		</section>
	);
};

function Subtitle({ className }: { className: string }) {
	return (
		<span
			className={cn(
				"rowHide fl-text-16/36  font-lagunac translate-y-[130%] font-normal leading-none",
				className
			)}
		>
			Изготовленные из гипоаллергенных
			<br /> растительных компонентов,
			<br /> ручной работы
		</span>
	);
}
