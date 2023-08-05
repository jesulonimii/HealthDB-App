import { UserContext } from "@context";
import { useContext } from "react";
import { GetUserInfo, Login as LoginUser, Signup as SignupUser } from "@api";
import { QUERY_KEYS, toast } from "@utils";
import useLocalStorage from "./useLocalStorage";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

const useAuth = () => {
	const router = useRouter();

	const { user, setUser } = useContext(UserContext);
	const { saveToStorage, removeFromStorage } = useLocalStorage();

	const refreshUser = async () => {
		try {
			let user_response = await GetUserInfo(user?.user_id);

			if (!user_response.error) {
				setUser(user_response);
				try {
					await saveToStorage(QUERY_KEYS.user_data, user_response);
					!user_response?.completed_app_registration && router.push("/complete-registration");
					return true;
				} catch (e) {
					return console.log("error-saving-to-storage", e);
				}
			} else {
				return {
					logged_in: false,
					error: user_response.error,
				};
			}
		} catch (e1) {
			Logout({ confirm: false });
			console.log("error-refreshing-user", e1);
			return {
				error: e1,
			};
		}
	};

	const Login = async (id, password) => {
		return LoginUser(id, password).then((r) => {
			if (!r.error) {
				setUser(r);
				saveToStorage(QUERY_KEYS.user_data, r)
					.then((res) => {
						res.completed_app_registration ? router.push("/home") : router.push("/complete-registration");
						toast({ message: `Welcome back ${r?.personal_info?.first_name}!` });
					})
					.catch((e) => {
						alert("An error occurred while saving to storage");
						console.log("error-saving-to-storage", e);
					});
			} else {
				toast({ message: r.error?.split(":")[1].trim(), title: r.error?.split(":")[0].trim(), type: "danger" });
			}
		});
	};

	const Signup = async (data: { password: string; first_name: string; last_name: string; matric_number: string }) => {
		return SignupUser(data).then((r) => {
			if (!r.error) {
				setUser(r.data);
				saveToStorage(QUERY_KEYS.user_data, r.data).then((r) => {
					router.push("/complete-registration");
				});
			} else {
				toast({ message: r.error?.split(":")[1].trim(), title: r.error?.split(":")[0].trim(), type: "danger" });
			}
		});
	};

	const Logout = (options: { confirm?: boolean } = { confirm: true }) => {
		const loggingOut = () => {
			router.push("/login");
			setUser(null);
			toast({ message: "Logged out successfully" });
			removeFromStorage(QUERY_KEYS.user_data).then((r) => console.log(r));
		};

		options?.confirm
			? Alert.alert("Logout", "Want to logout?", [
					{
						text: "No",
						onPress: () => {},
					},
					{
						text: "Yes, Log me out.",
						style: "destructive",
						onPress: () => {
							loggingOut();
						},
					},
			  ])
			: loggingOut();
	};

	return {
		Login,
		Logout,
		refreshUser,
		Signup,
		user,
		setUser,
	};
};

export default useAuth;
