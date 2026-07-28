import { getPayload } from "payload";
import configPromise from "@/payload/payload.config";
import type {
	Project,
	ProjectsBlock as ProjectBlockProps,
} from "@/payload/payload-types";
import { FillReveal } from "@/shared/components/Animation/FillReveal";
import { Bounded } from "@/shared/components/Bounded";
import { Media } from "@/shared/components/Media";

export async function ProjectsBlock({
	populateBy,
	limit,
	selectedDocs,
}: ProjectBlockProps) {
	let projects: Project[] = [];

	if (populateBy === "collection") {
		const payload = await getPayload({ config: configPromise });

		const fetched = await payload.find({
			collection: "projects",
			depth: 1,
			limit: limit || 10,
		});

		projects = fetched.docs;
	} else {
		if (selectedDocs?.length) {
			const filteredSelected = selectedDocs?.map((project) => {
				if (typeof project.value === "object") return project.value;
			}) as Project[];

			projects = filteredSelected;
		}
	}
	return (
		<div
			id="works"
			className="min-h-dvh heightWithoutHeader bg-black dark:bg-card text-white dark:text-black"
		>
			<Bounded className={"fl-py-64/180"}>
				<h3 className="relative w-full font-bold text-center fl-text-20/40 px-4 md:w-3/5 md:mx-auto py-16 z-10">
					Our Projects
				</h3>

				<div className="flex flex-col fl-gap-16/32">
					{projects?.length ? (
						projects
							?.filter((project) => typeof project === "object")
							.map(({ id, title, year, gallery }) => (
								<div
									key={id}
									data-project-card={id}
									className="flex flex-col df-gap-3-8 md:flex-row items-center"
								>
									<div className="projectMedia basis-1/2">
										<div className="df-px df-py bg-accent">
											{typeof gallery?.[0] === "object" &&
											gallery[0]?.mediaItem ? (
												<Media resource={gallery[0].mediaItem} />
											) : null}
										</div>
									</div>
									<div className="basis-1/2 flex justify-center items-center relative">
										<FillReveal
											scrollTrigger={{
												trigger: `[data-project-card="${id}"]`,
												start: "top 75%",
											}}
											direction="ltr"
											className="df-px df-py"
											fillClassName="bg-accent"
										>
											{title && (
												<span className="block fl-text-20/24 font-extralight">
													{title}
												</span>
											)}
											{year && (
												<span className="block text-secondary fl-text-20/24 font-extralight">
													{year}
												</span>
											)}
										</FillReveal>
									</div>
								</div>
							))
					) : (
						<div>No projects found</div>
					)}
				</div>
			</Bounded>
		</div>
	);
}
