import type React from "react";
import { Text } from "@/shared/components/Text";

type LowImpactHeroType =
	| {
			children?: React.ReactNode;
			Text?: never;
	  }
	| (Omit<any, "Text"> & {
			children?: never;
			Text?: any;
	  });

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
	children,
	Text,
}) => {
	return (
		<div className='container mt-4 flex justify-center xl:mt-8'>
			<div className='max-w-[48rem]'>
				{children || (Text && <Text data={Text} enableGutter={false} />)}
			</div>
		</div>
	);
};
