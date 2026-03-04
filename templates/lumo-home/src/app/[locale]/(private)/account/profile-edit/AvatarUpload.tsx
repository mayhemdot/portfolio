"use client";

import type React from "react";
import { useState, useRef } from "react"; // Добавлен useRef
import Image from "next/image";
import { Input } from "@/shared/components/ui/input"; // Input останется скрытым
import { Camera, Loader2 } from "lucide-react"; // Добавлена иконка камеры
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import toast from "react-hot-toast";
import { Text } from "@/shared/components/Text";

type AvatarUploadProps = {
	userId: string | undefined;
	url: string | null;
	size: number;
	onUpload: (url: string) => void;
};
export default function AvatarUpload({
	userId,
	url,
	size,
	onUpload,
}: AvatarUploadProps) {
	const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
	const [uploading, setUploading] = useState(false);

	const [file, setFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null); // Ссылка на скрытый input

	const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setUploading(true);
			if (!event.target.files || event.target.files.length === 0) {
				throw new Error("You must select an image to upload.");
			}

			const file = event.target.files[0];
			const fileExt = file.name.split(".").pop();
			const filePath = `${userId}-${Math.random()}.${fileExt}`;

			onUpload(filePath);
			setFile(file);
			setAvatarUrl(URL.createObjectURL(file));
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Error uploading avatar!",
			);
		} finally {
			setUploading(false);
		}
	};

	const handleAvatarClick = () => {
		if (!uploading && fileInputRef.current) {
			fileInputRef.current.click(); // Имитируем клик по скрытому input
		}
	};
	const [isLoading, setIsLoading] = useState();
	const saveAvatarHandler = () => {};

	return (
		<div className='relative flex flex-col items-center gap-4'>
			<button
				className='group relative cursor-pointer overflow-hidden rounded-full border-2 border-gray-200 shadow-sm transition-all duration-200 '
				style={{ height: size, width: size }}
				onClick={handleAvatarClick}
				type='button'
				tabIndex={0}
				onKeyUp={e => {
					if (e.key === "Enter" || e.key === " ") {
						handleAvatarClick();
					}
				}}
			>
				{avatarUrl ? (
					<Image
						width={size}
						height={size}
						src={avatarUrl || "/placeholder.svg"}
						alt='Avatar'
						className='h-full w-full object-cover'
					/>
				) : (
					<div className='bg-muted flex h-full w-full items-center justify-center'>
						<Text
							comp='p'
							variant='mutedForeground'
							className='text-muted-foreground text-sm'
						>
							Нет изображения
						</Text>
					</div>
				)}

				{/* Оверлей для загрузки или иконки камеры */}
				<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
					{uploading ? (
						<Loader2 className='size-8 animate-spin text-white' />
					) : (
						<Camera className='size-8 text-white' />
					)}
				</div>
			</button>

			{/* Скрытый input для выбора файла */}

			<form action={saveAvatarHandler}>
				<Input type='hidden' name='userId' value={userId} />
				<Input
					ref={fileInputRef}
					name='avatar_file'
					className='sr-only'
					type='file'
					id='single-avatar-upload' // Уникальный ID
					accept='image/*'
					onChange={uploadAvatar}
					disabled={uploading}
				/>
				<Button
					type='submit'
					className={cn({
						hidden: !file,
					})}
					disabled={uploading || !file || isLoading}
				>
					Click to upload
				</Button>
			</form>
		</div>
	);
}

// const [state, saveAvatarHandler, isLoading] = useActionState<any, any>(
// 	saveAvatar,
// 	{
// 		success: undefined,
// 		errors: undefined,
// 	},
// );
// useEffect(() => {
// 	if (state.success === true) {
// 		toast.success("Avatar saved successfully!");
// 	}
// 	if (state.success === false) {
// 		toast.error("Avatar save failed!");
// 	}
// }, [state.success]);
// useEffect(() => {
//   async function downloadImage(path: string) {
//     try {
//       console.warn(
//         "Supabase client not available for image download. Using placeholder."
//       );
//       setAvatarUrl("/placeholder.svg?height=150&width=150");
//     } catch (error) {
//       console.error("Error downloading image: ", error);
//     }
//   }
//   if (url) downloadImage(url);
// }, [url]);
