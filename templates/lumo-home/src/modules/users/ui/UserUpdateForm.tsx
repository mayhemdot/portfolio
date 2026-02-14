"use client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { InputField } from "@/shared/components/InputField";
import { Button } from "@/shared/components/ui/button";
import { User } from "@/modules/users/model/types";

type Props = {
	user: User;
	avatarUrl: string;
};

export function UserUpdateForm({ user, avatarUrl }: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<any>({});

	const handleSignin = (value: any) => {
		toast.success("Profile updated successfully!");
	};
	return (
		<form onSubmit={handleSignin} className='mb-4 space-y-4'>
			<h3 className='fl-text-20/32'>Basic information</h3>
			<div className='flex flex-col gap-4 md:flex-row'>
				<InputField
					label={""}
					type='number'
					name='userId'
					disabled={isSubmitting || isLoading}
					className='bg-background! hidden w-full'
					wrapperClassName='hidden'
				/>

				<InputField
					label={"Name"}
					type='text'
					name='name'
					placeholder='Name'
					autoComplete='Name'
					className='bg-background! grow'
					wrapperClassName='grow'
					disabled={isSubmitting || isLoading}
				/>

				<InputField
					label={"Phone"}
					type='text'
					name='phoneNumber'
					placeholder='Phone number'
					wrapperClassName='grow'
					className='bg-background!'
					disabled={isSubmitting || isLoading}
				/>
			</div>

			<Button
				type='submit'
				className='w-full py-2.5 transition-colors duration-200'
				size={"lg"}
				disabled={isLoading}
			>
				{isLoading ? (
					<>
						<Loader2 className='size-5 mr-2 animate-spin' /> Сохранение...
					</>
				) : (
					"Обновить профиль"
				)}
			</Button>
			{errors?.root && (
				<p className='mt-2 text-sm text-red-600'>
					{errors.root?.message?.toString()}
				</p>
			)}
		</form>
	);
}
