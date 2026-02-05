"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { InputField } from "@/shared/components/InputField";
import { Button } from "@/shared/components/ui/button";
import { sleep } from "@/shared/utils/timeout";

// import { GoogleLoginButton } from "../better-auth/GoogleLoginButton";

type LoginFormProps = {
	data?: any;
	errors?: any;
	success: boolean;
};

export function LoginFormClient() {
	const router = useRouter();
	const [errors, setErrors] = useState<any>();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const t = useTranslations("Login");

	const handleSignin = async (e: any) => {
		toast.success("You are logged in!");
		e.preventDefault();
		setErrors({});

		if (!password) {
			setErrors({ root: "Passwords do not match" });
			return;
		}
		if (!email) {
			setErrors({ root: "Email is required" });
			return;
		}

		setIsLoading(true);

		await sleep(2000);

		setErrors({});
		toast.success("Account created successfully!");

		setIsLoading(false);

		router.push("/login");
	};

	return (
		<form onSubmit={handleSignin} className='space-y-4'>
			<InputField
				label={t("form.emailLabel")}
				type='text'
				name='email'
				placeholder={t("form.emailPlaceholder")}
				autoComplete='email'
				disabled={isLoading}
				onChange={e => setEmail(e.target.value)}
			/>
			<InputField
				label={t("form.passwordLabel")}
				type='password'
				name='password'
				link={{
					href: "/forgot-password",
					label: t("form.forgotPassword"),
				}}
				placeholder={t("form.passwordPlaceholder")}
				autoComplete='current-password'
				disabled={isLoading}
				onChange={e => setPassword(e.target.value)}
			/>
			<Button type='submit' size={"lg"} disabled={isLoading} className='w-full'>
				{t("form.submit")}
			</Button>
			{errors?.root?.message && (
				<p className='py-4 text-red-600'>{errors.root.message}</p>
			)}
		</form>
	);
}

// export function LoginForm() {
//   const [state, loginAction, isLoading] = useActionState<LoginFormProps, any>(
//     loginUserWithPlugin,
//     {
//       data: undefined,
//       errors: undefined,
//       success: false,
//     },
//   );

//   return (
//     <form action={loginAction}>
//       <Input
//         name="email"
//         type="email"
//         placeholder="Email"
//         autoComplete="email"
//         className="mb-4"
//         disabled={isLoading}
//       />
//       {state.errors?.email && (
//         <p className="text-red-600 py-4">{state.errors.email.toString()}</p>
//       )}
//       <Input
//         name="password"
//         type="password"
//         placeholder="Password"
//         autoComplete="current-password"
//         disabled={isLoading}
//       />
//       {state.errors?.password && (
//         <p className="text-red-600 py-4">{state.errors.password.toString()}</p>
//       )}

//       <Button type="submit" disabled={isLoading} className="mt-4 w-full">
//         Login
//       </Button>

//       <GoogleLoginButton />

//       {state.errors?.root && (
//         <p className="text-red-600 py-4">{state.errors.root.toString()}</p>
//       )}
//     </form>
//   );
// }
