import Link from "next/link";

import { Icons } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/modules/common/data/constants";

const Logo = ({ className }: { className?: string }) => {
	return (
		<Link
			href={"/"}
			className={cn("flex gap-2 underline-offset-0", className)}
			aria-label={SITE_NAME}
		>
			<Icons.logo
				width={"48px"}
				height={"48px"}
				style={{ width: "auto", height: "auto" }}
				aria-hidden={true}
			/>
			<span className='fsSmall flex items-center text-sm leading-[120%]'>
				Prosperity
				<br />
				Candle
			</span>
		</Link>
	);
};

export default Logo;
