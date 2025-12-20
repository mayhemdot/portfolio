import { Text } from "@/components/Text";

type WorkflowBlockProps = {
	introContent: string;
	contentBody: string;
	contentTitle: string;
	mediaBackgroundSrc: string;
	mediaForegroundSrc: string;
};

export function WorkflowBlock(
	props: WorkflowBlockProps & {
		id?: string;
	}
) {
	const {
		introContent,
		contentBody,
		contentTitle,
		mediaBackgroundSrc,
		mediaForegroundSrc,
	} = props;

	return (
		<section
			id='workflowTrigger'
			className={"content-section min-h-dvh flex items-center"}
		>
			{introContent && (
				<Text
					comp='p'
					size={"md"}
					variant={"primary"}
					className={"mb-8 md:mb-12"}
				>
					{introContent}
				</Text>
			)}
			<div className={"grid grid-cols-1 lg:grid-cols-12 lg:gap-8"}>
				<div className='relative col-span-5' area-hidden='true'>
					<div className='relative ml-auto w-full overflow-hidden rounded-xl pb-[100%]'>
						<img
							className='masterBg absolute h-full w-[60%] scale-125 rounded-xl object-cover will-change-auto'
							src={mediaBackgroundSrc}
							style={{ clipPath: "inset(0 100% 0 0)" }}
							alt='фото мастерской'
						/>
						<div
							className={
								"size-[68%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-xl"
							}
						>
							<img
								className='master absolute scale-125 rounded-xl will-change-auto'
								src={mediaForegroundSrc}
								style={{ clipPath: "inset(0 100% 0 0)" }}
								alt='фото мастерской'
							/>
						</div>
					</div>
				</div>
				<div
					className={
						"textBlockMaster fl-py-48/128 fl-text-32/96 col-span-7 mt-8 opacity-0 lg:mt-0"
					}
				>
					<div className='md:max-w-2/3 mx-auto space-y-8'>
						<Text
							comp={"h3"}
							size={"xl"}
							variant={"primary"}
							font={"romile"}
							className='uppercase'
						>
							{contentTitle}
						</Text>
						<Text
							comp={"p"}
							size={"smd"}
							variant={"primary"}
							font={"laguna"}
							className={"prose xl:prose-xl"}
						>
							{contentBody}
						</Text>

						<div className={"w-full text-center"}>
							<img
								className='mx-auto'
								src={"/images/love.png"}
								width={200}
								height={100}
								alt={""}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// function fetchSrc(image: Media) {
// 	let { filename, url } = image;
// 	if (!url) {
// 		url = `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}`;
// 	}
// 	return url;
// }
