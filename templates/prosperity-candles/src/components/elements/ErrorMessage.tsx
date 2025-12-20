import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import ServiceInfo from "@/components/ui/elements/ServiceInfo";
import { SERVICE_LINKS } from "@/modules/common/data/urls";

function ErrorMessage({
	message,
	description,
}: {
	message: string;
	description: string;
}) {
	return (
		<ServiceInfo title={`${message}`}>
			<>
				{/* &#9940; */}
				<p className='fsMiddle'>{description}</p>
				<p>Вернитесь и попробуйте снова. Возможно вам повезет</p>
				<Link
					href={SERVICE_LINKS.HOME}
					className={buttonVariants({
						variant: "default",
						size: "lg",
						className: "fsNormal",
					})}
				>
					Вернуться обратно
				</Link>
			</>
		</ServiceInfo>
	);
}

export default ErrorMessage;
