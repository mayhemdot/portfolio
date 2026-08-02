import { Header } from "@/payload/blocks/Header/Component";
import { NotFoundHero } from "@/shared/components/NotFound";

export default async function NotFound() {
	return (
		<>
			<Header />
			<main className="main min-h-screen shrink-0">
				<NotFoundHero />
			</main>
		</>
	);
}
