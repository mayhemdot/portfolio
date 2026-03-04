"use client";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";

export function GoogleLoginButton() {
	const [isLoading, setIsLoading] = useState(false);
	const handleGoogleAction = async () => {};
	// await signIn.social({
	//   provider: "google",
	// });

	// const [_, handleGoogleSignin, isLoading] = useActionState<any, any>(
	//   handleGoogleAction,
	//   {
	//     data: undefined,
	//     errors: undefined,
	//     success: false,
	//   },
	// );
	// const handleTwitchSignin = () => {
	//   oauth('twitch')
	// }

	return (
		<div className='w-full'>
			<div className='relative mb-2 flex w-full justify-center'>
				<div className='bg-secondary absolute top-1/2 w-full translate-y-1/2 border-b' />
				<p className='text-md bg-secondary z-10 w-fit text-center'>OR</p>
			</div>
			<div className='space-y-4'>
				<form action={handleGoogleAction}>
					<Button
						// formAction={handleGoogleSignin}
						// onClick={handleGoogleSignin}
						type='submit'
						variant='outline'
						size={"lg"}
						className='relative w-full'
					>
						<Image
							src='/google2.svg'
							alt='Google'
							width={30}
							height={30}
							className='mr-1'
						/>
						Continue with Google{" "}
						{isLoading && <Loader className='icon-size ml-2 animate-spin' />}
					</Button>
				</form>
			</div>
		</div>
	);
}
