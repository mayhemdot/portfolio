import type React from "react";
import Checkmark from "@/components/Checkmark/Checkmark";
import { Card, CardContent } from "@/components/elements/Card";
import { Separator } from "@/components/ui/separator";

export function SuccessfullyMessage({
	title,
	message,
	actions,
}: {
	title: string;
	message: React.ReactNode;
	actions?: React.ReactNode;
}) {
	return (
		<Card>
			<CardContent>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col items-center gap-2'>
						<Checkmark />
						<h1>{title}</h1>
					</div>
					<Separator />
					<div>
						<p className='fsNormal flex flex-col pb-4'>{message}</p>
						<div className={"flex flex-wrap gap-2"}>{actions}</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
