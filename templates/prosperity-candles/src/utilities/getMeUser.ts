import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { User } from "@/modules/users/types";

export const getMeUser = async (args?: {
	nullUserRedirect?: string;
	validUserRedirect?: string;
}): Promise<{
	user: User;
}> => {
	// const { nullUserRedirect, validUserRedirect } = args || {};
	// const cookieStore = cookies();
	// const token = cookieStore.get("payload-token")?.value;

	// const meUserReq = await fetch(
	// 	`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
	// 	{
	// 		headers: {
	// 			Authorization: `JWT ${token}`,
	// 		},
	// 	}
	// );

	// const {
	// 	user,
	// }: {
	// 	user: User;
	// } = await meUserReq.json();

	// if (validUserRedirect && meUserReq.ok && user) {
	// 	redirect(validUserRedirect);
	// }

	// if (nullUserRedirect && (!meUserReq.ok || !user)) {
	// 	redirect(nullUserRedirect);
	// }
	const user: User = {
		id: 1,
		password: "test",
		name: "Test",
		email: "p_mayhem@mail.ru",
		roles: ["customer"],
		purchases: [],
		updatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
	};
	return {
		user,
	};
};
