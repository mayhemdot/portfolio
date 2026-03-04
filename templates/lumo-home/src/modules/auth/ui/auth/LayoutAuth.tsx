import Image from "next/image";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

type Props = {
	imageSrc: string;
	title: string;
	description: string;
	children: React.ReactNode;
	footer: React.ReactNode;
	action: React.ReactNode;
};

export function LayoutAuth({
	children,
	action,
	footer,
	title, // Login to your account
	description, //   Enter your email below to login to your account
	imageSrc = "/images/product_2.jpg",
}: Props) {
	return (
		<div className='fl-my-48/128 mx-2 flex h-fit min-h-[600px] max-w-4xl items-stretch justify-center md:mx-auto'>
			{imageSrc && (
				<div className='relative hidden min-h-full w-1/2 lg:block'>
					<Image
						fill
						src={imageSrc}
						alt='Cover Image'
						className='rounded-4xl rounded-r-none object-cover'
					/>
				</div>
			)}
			<Card
				className={cn(
					"bg-secondary min-h-full! lg:max-w-145 rounded-4xl w-full max-w-md px-0 lg:w-1/2 lg:px-8",
					{
						"lg:rounded-l-none!": imageSrc,
					},
				)}
			>
				<CardHeader>
					<CardTitle className='fl-text-24/32'>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
					<CardAction>{action}</CardAction>
				</CardHeader>
				<CardContent>{children}</CardContent>
				<CardFooter className='pt-0'>{footer}</CardFooter>
			</Card>
		</div>
	);
}
