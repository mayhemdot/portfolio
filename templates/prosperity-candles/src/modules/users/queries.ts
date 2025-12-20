import { useUserStore } from "./store";
import type { User } from "./types";

export const fakeUser: User = {
	id: 1,
	name: "John Doe",
	email: "test@test.com",
	roles: ["customer"],
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	password: "password",
};

export const useAuth = () => {
	const { user, setUser, isLoading, setIsLoading } = useUserStore();

	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		setIsLoading(true);
	// 		// const user = await getMe();
	// 		setUser(user);
	// 		setIsLoading(false);
	// 	};
	// 	fetchUser();
	// }, [setUser, setIsLoading]);

	const login = () => {
		setIsLoading(true);
		setUser(fakeUser);
		setIsLoading(false);
	};

	const logout = () => {
		setIsLoading(true);
		setUser(null);
		setIsLoading(false);
	};

	return { user, isLoading, login, logout };
};
