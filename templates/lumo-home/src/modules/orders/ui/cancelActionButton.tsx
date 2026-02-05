"use client";
import { Button } from "@/shared/components/ui/button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export function CancelActionButton({
	id,
	className,
}: {
	id?: number;
	className?: string;
}) {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();
	const tGlob = useTranslations("Global.Messages");

	const [isLoading, setIsLoading] = useState(false);
	const cancelOrderHandler = (id?: number) => {
		toast.error(tGlob("login"));
	};

	return (
		<div>
			<Button
				variant='outline'
				size='sm'
				onClick={() => startTransition(async () => cancelOrderHandler(id))}
				disabled={isLoading || isPending}
				className={cn(
					"bg-transparent text-red-600 hover:text-red-700",
					className
				)}
			>
				Отменить заказ
			</Button>
			{/* {state?.error && <p className='py-4 text-red-600'>{state.error}</p>} */}
		</div>
	);
}
