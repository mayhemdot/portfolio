"use client";
import type React from "react";
import { CMSLink } from "@/shared/components/Link";
import { Media } from "@/shared/components/Media";
import { Text } from "@/shared/components/Text";

export const HighImpactHero: React.FC<any> = ({ links, media, Text }) => {
	//   const { setHeaderTheme } = useHeaderTheme();
	//   useEffect(() => {
	//     setHeaderTheme("dark");
	//   });

	return (
		<div
			className='relative -mt-[10.4rem] flex items-center justify-center text-white'
			data-theme='dark'
		>
			<div className='container relative z-10 mb-8 flex items-center justify-center'>
				<div className='max-w-[36.5rem] md:text-center'>
					{Text && <Text className='mb-6' data={Text} enableGutter={false} />}
					{Array.isArray(links) && links.length > 0 && (
						<ul className='flex gap-4 md:justify-center'>
							{links.map(({ link }, i) => {
								return (
									<li key={i}>
										<CMSLink {...link} />
									</li>
								);
							})}
						</ul>
					)}
				</div>
			</div>
			<div className='min-h-[80vh] select-none'>
				{media && typeof media === "object" && (
					<Media
						fill
						imgClassName='-z-10 object-cover'
						priority
						resource={media}
					/>
				)}
			</div>
		</div>
	);
};
