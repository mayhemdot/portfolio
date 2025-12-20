"use client";

import { useEffect, useState } from "react";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { AuthService } from "@/services";

interface VerifyEmailProps {
	token: string;
}

interface VerifyData {
	token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
	// const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
	// 	token,
	// });

	const [respVerify, setVerifyResp] = useState<{
		data?: any | null;
		error?: any | null;
		loading?: boolean;
	}>({
		data: null,
		error: null,
		loading: false,
	});

	// const { mutate: verifyEmail } = trpc.auth.verifyEmail.useMutation({
	// 	onSuccess: resp => setVerifyResp({ data: resp, error: null }),
	// 	onError: e => setVerifyResp({ error: e }),
	// });

	const { mutate: verifyEmail } = useMutation({
		mutationFn: async (data: VerifyData) =>
			await AuthService.verifyEmail<VerifyData>(data),
		onSuccess: (resp: VerifyData) => setVerifyResp({ data: resp, error: null }),
		onError: e => setVerifyResp({ error: e }),
	});
	useEffect(() => {
		setVerifyResp(prev => ({ ...prev, loading: true }));
		verifyEmail({ token });
		// UserService.verifyEmail(token)
		// 	.then(resp => setVerifyResp({ data: resp?.data, error: resp?.error }))
		// 	.catch(e => setVerifyResp({ error: e?.error ?? e }));
	}, [token]);

	if (respVerify?.error) {
		return (
			<div className='flex flex-col items-center gap-2'>
				<XCircle className='h-8 w-8 text-red-600' />
				<h3 className='fsTitle font-semibold'>Упс! Что-то пошло не так</h3>
				<p className='fsMiddle text-muted-foreground'>
					{/* This token is not valid or might be expired. Please try again. */}
					Получен невалидный или истекший токен. Попробуйте еще раз
				</p>
			</div>
		);
	}

	if (respVerify?.data) {
		return (
			<div className='flex h-full min-w-[320px] flex-col items-center justify-center xl:min-w-[500px]'>
				<div className='size-32 relative mb-8 text-muted-foreground'>
					<Image
						src='/images/thumb.gif'
						className='absolute left-0 top-0  h-full w-full object-cover'
						alt='the email was sent'
					/>
				</div>

				<h3 className='fsTitle font-semibold'>
					{/* You&apos;re all set! */}
					Успех!
				</h3>
				<p className='fsMiddle mt-1 text-left text-muted-foreground'>
					{/* Thank you for verifying your email. */}
					Благодарим вас за подтверждения
					<br /> вашего аккаунт
				</p>
				<Link
					className={buttonVariants({ className: "mt-8", size: "lg" })}
					href='/account/login'
				>
					{/* Sign in */}
					Залогиниться
				</Link>
			</div>
		);
	}

	if (respVerify?.loading) {
		return (
			<div className='flex flex-col items-center gap-2'>
				<Loader2 className='size-8 animate-spin text-zinc-300' />
				<h3 className='fsTitle font-semibold'>
					{/* Verifying... */}
					Подтверждение...
				</h3>
				<p className='fsMiddle text-muted-foreground'>
					{/* This won&apos;t take long. */}
					Это не займет много времени.
				</p>
			</div>
		);
	}
};

export default VerifyEmail;
