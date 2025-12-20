import Link from "next/link";

import { HEADER_LINKS } from "@/modules/common/data/constants";

import s from "./Links.module.scss";

function Links() {
	return (
		<span className='hidden items-center justify-between gap-4 text-sm md:gap-16 lg:flex'>
			{HEADER_LINKS.map(link => (
				<Link key={link.id} href={link.url} className={s.point}>
					{link.name}
				</Link>
			))}
		</span>
	);
}

export default Links;
