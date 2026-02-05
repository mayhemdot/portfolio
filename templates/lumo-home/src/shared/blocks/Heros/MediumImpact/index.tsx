import type React from "react";
import { CMSLink } from "@/shared/components/Link";
import { Media } from "@/shared/components/Media";
import { Text } from "@/shared/components/Text";

export const MediumImpactHero: React.FC<any> = ({ links, media, Text }) => {
	return (
		<div className=''>
			<div className='container mb-8'>
				{Text && <Text className='mb-6' data={Text} enableGutter={false} />}

				{Array.isArray(links) && links.length > 0 && (
					<ul className='flex gap-4'>
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
			<div className='container'>
				{media && typeof media === "object" && (
					<div>
						<Media
							className='-mx-4 md:-mx-8 2xl:-mx-16'
							imgClassName=''
							priority
							resource={media}
						/>
						{/* {media?.caption && (
              <div className="mt-3">
                <Text data={media.caption} enableGutter={false} />
              </div>
            )} */}
					</div>
				)}
			</div>
		</div>
	);
};
