"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { Suspense, useEffect, useRef } from "react";
import { Input } from "@/components/Input";
import { LinkButton } from "@/components/LinkButton";
import { ACCOUNT_LINKS } from "@/modules/common/data/urls";
import { fakeUser, useAuth } from "@/modules/users/queries";

const LoginForm: React.FC = () => {
	const searchParams = useSearchParams();
	const allParams = searchParams.toString()
		? `?${searchParams.toString()}`
		: "";
	const redirect = useRef(searchParams.get("redirect"));

	const { user, login, isLoading } = useAuth();

	const router = useRouter();

	useEffect(() => {
		if (user) {
			console.log("user", user);
			router.push((redirect.current as string) || "/account");
		}
	}, [user, router]);

	const onSubmit = async (data: any) => login();
	return (
		<Suspense fallback={<ReloadIcon className='animate-spin' />}>
			<form
				onSubmit={e => {
					e.preventDefault();
					onSubmit(e);
				}}
				className={"relative mb-4 w-full space-y-2"}
			>
				<Input
					name='email'
					label='Email'
					required
					disabled
					type='email'
					value={fakeUser.email}
				/>
				<Input
					name='password'
					type='password'
					label='Пароль'
					disabled
					required
					value={fakeUser.password || ""}
				/>
				<div className='flex w-full items-center justify-between pt-2'>
					<LinkButton
						aria-label='Восстановить пароль'
						href={`${ACCOUNT_LINKS.RESET}${allParams}`}
						size={"none"}
					>
						Восстановить пароль?
					</LinkButton>
					<LinkButton aria-label='Войти в аккаунт' type='submit'>
						Войти
					</LinkButton>
				</div>
			</form>
		</Suspense>
	);
};

export default LoginForm;
