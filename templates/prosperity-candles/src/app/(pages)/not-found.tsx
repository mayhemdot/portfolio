// import { Button } from '../_components/Button'

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Gutter } from "../../components/Gutter";
import { VerticalPadding } from "../../components/VerticalPadding";

export default function NotFound() {
	return (
		<Gutter>
			<div className='flex min-h-screen items-center justify-center'>
				<VerticalPadding top='none' bottom='large'>
					<h1 className='fsSubtitle mb-8' style={{ marginBottom: 0 }}>
						Error 404
					</h1>
					<p className='fsMiddle  mb-8'>This page could not be found.</p>
					<Link href='/' className={buttonVariants({})}>
						Go Home
					</Link>
				</VerticalPadding>
			</div>
		</Gutter>
	);
}
