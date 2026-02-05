"use client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { InputField } from "@/shared/components/InputField";
import { Button } from "@/shared/components/ui/button";

// import { Form } from "@/shared/components/ui/form";

// import { useMutation } from '@tanstack/react-query'
// import { restApi } from "@/shared/utils/restApi";

// import {
//   type UpdateProfileSchema,
//   updateProfileSchema,
// } from "../modules/schemas";

// import { stringify } from 'qs-esm'

type Props = {
	user: any;
	avatarUrl: string;
};

export function UserUpdateForm({ user, avatarUrl }: Props) {
	// const { mutate: updateUser } = useMutation({
	//   mutationFn: (data: UpdateProfileSchema) =>
	//     restApi(
	//       `/api/users${stringify(
	//         {
	//           where: {
	//             id: {
	//               equals: user.id,
	//             },
	//           },
	//         },
	//         { addQueryPrefix: true },
	//       )}`,
	//       {
	//         method: 'PATCH',
	//         body: JSON.stringify(data),
	//       },
	//     ),
	//   onSuccess: () => toast.success('Profile updated successfully!'),
	//   onError: () => toast.error('Something went wrong!'),
	// })

	// const form = useForm<UpdateProfileSchema>({
	//   resolver: zodResolver(updateProfileSchema),
	//   defaultValues: {
	//     userId: user.id,
	//     name: user.name || '',
	//     phoneNumber: user.phoneNumber || '',
	//   },
	// })

	// const { isLoading, isSubmitting, errors } = form.formState
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<any>({});

	const handleSignin = (value: any) => {
		toast.success("Profile updated successfully!");
	}; //updateUser(value)
	return (
		<form onSubmit={handleSignin} className='mb-4 space-y-4'>
			<h3 className='fl-text-20/32 '>Basic information</h3>
			<div className='flex flex-col gap-4 md:flex-row'>
				<InputField
					label={""}
					type='number'
					name='userId'
					disabled={isSubmitting || isLoading}
					className='hidden w-full'
					wrapperClassName='hidden'
				/>

				<InputField
					label={"Name"}
					type='text'
					name='name'
					placeholder='Name'
					autoComplete='Name'
					className='grow'
					wrapperClassName='grow'
					disabled={isSubmitting || isLoading}
				/>

				<InputField
					label={"Phone"}
					type='text'
					name='phoneNumber'
					placeholder='Phone number'
					wrapperClassName='grow'
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
